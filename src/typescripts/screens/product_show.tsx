import * as React from 'react';
import {ProductService} from '../services';
import {RouteComponentProps} from 'react-router-dom';
import Screen from './screen';
import {Product} from '../entities';
import {Loading, Icon, Modal, ProductShowFooter as Footer} from '../components';
import { ApplicationManager } from '../application_manager';
import { VoteService } from '../services/vote';

interface Props extends RouteComponentProps < { id: number } > {}

interface State {
    product: Product | null;
    activeImagePath?: string;
    showVoteModal: boolean;
    reVoteModal: boolean;
    deleteImgSelect: boolean;
    deleteSelectProductId: number | null;
    suggestedProducts: any;
    votedProducts: any;
}

export class ProductShow extends React.Component < Props, State > {
    constructor(props: Props) {
        super(props);
        this.state = {
            product: null,
            showVoteModal: false,
            reVoteModal: false,
            deleteImgSelect: false,
            deleteSelectProductId: null,
            suggestedProducts: [],
            votedProducts: [],
        };
    }

    public async componentDidMount() {
        const product = await ProductService.get(this.props.match.params.id);

        if (product && product.photos) {
            this.setState({product, activeImagePath: product.headShot});
        }

        let suggestedProductIds: number[] = [];
        while (suggestedProductIds.length < 5) {
            const rand = Math.floor(Math.random() * 50) + 1;
            suggestedProductIds.push(rand);
            suggestedProductIds = [...new Set(suggestedProductIds)];
        }

        const suggestedProducts = await ProductService.asyncMap(suggestedProductIds, async (id: number) => {
            return await ProductService.get(id);
        });

        const appManager = ApplicationManager.instance;
        const votedProducts = await ProductService.asyncMap(appManager.voteIds[product.genreLowerCase], async (id: number) => {
            return await ProductService.get(id);
        });

        this.setState({ suggestedProducts, votedProducts });
    }

    public render() {

        if (this.state.product == null || this.state.product.photos == null) return <Loading />;

        const subImages = this.state.product.photos.map((img, index) => {
            return (
                <p key={index} className='img-container cover' onClick={this.changeActiveImage}>
                    <img
                        className={`${this.state.activeImagePath === img ? 'img active' : 'img none-active'}`}
                        src={img}
                        width={100}
                        height={100}
                    />
                </p>
            );
        });

        const owner = this.state.product.owner;

        const entryOrder = ProductService.productId2EntryOrderMapperByValue(this.state.product.genre, this.state.product.productId);

        const members = this.state.product.members.map((m, index) => {
            return (
                <p
                    key={index}
                    className={`${this.state.product && this.state.product.genre === 'FASHION' ? 'member-name' : 'members-name'}`}
                >
                    {
                        // product id == 12 だけ対応
                        m.studentName.includes('<br />') ?
                            m.studentName.split('<br />').map(e => (<p>{e}</p>)) :
                            m.studentName
                    }
                </p>
            );
        });

        const votedProducts = this.state.votedProducts.map((product: Product, index: number) => {
            return (
                <p
                    key={index}
                    className='delete-image-box'
                    onClick={this.selectDeleteImage}
                    data-product-id={Number(product.productId)}
                >
                    <img
                        className='re-vote-product-image'
                        src={product.headShot}
                    />
                </p>
            );
        });

        const suggestedProducts = this.state.suggestedProducts.map((product: Product, index: number) => {
            return (
                <div
                    key={index}
                    className='suggested-product'
                    onClick={() => window.location.href = window.location.origin + '/products/' + product.productId}
                >
                    <img
                        className='short-product-thumb'
                        src={product.headShot}
                    />
                    <span className='product-label'>{product.theme}</span>
                </div>
            );
        });

        const voteBtn = (VoteService.includeVoteId(this.state.product)) ?
            (<span>取り消す</span>) : (<span>投票する</span>);

        return (
            <Screen name='product-show' showBackButton>
                <Modal
                    open={this.state.reVoteModal}
                    heading='投票権がありません'
                    className='re-vote-modal'
                    onClose={() => this.setState({ reVoteModal: false, deleteImgSelect: false})}
                >
                    <p className='re-vote-text'>
                        このままこの作品への投票を希望する場合は以下の投票済みリストから投票をキャンセルする作品をお選びください
                    </p>
                    <div className='re-vote-image-list'>
                        {votedProducts}
                    </div>
                    <button className='re-vote-button'　onClick={this.voteSwitch}>
                        <span>投票を取り消す</span>
                    </button>
                </Modal>
            <Modal
                open={this.state.showVoteModal}
                heading='投票が完了しました'
                className='voted-modal'
                onClose={() => this.setState({ showVoteModal: false })}
            >

                <div className='product voted-card'>
                    <img className='product-thumb' src={this.state.product.headShot}/>
                    <div className='right-container'>
                            <p className='right-container__title'>{this.state.product.theme}</p>
                            made by
                        <p className='creator'>{owner.studentName}</p>
                    </div>
                </div>

            {/* 画像リンクをカードで何個か出す。 */}
                <p className='suggest-product-title'>他の作品も閲覧しませんか？</p>
                <div className='suggest-product-container'>
                    {suggestedProducts}
                </div>

                <button className='vote-button-ext' onClick={() => this.setState({showVoteModal: false})}>
                    <span>閉じる</span>
                </button>
            </Modal>

            <div className='image-container'>
                <img
                    className={`${this.state.product.photos[0].indexOf('/01.') !== -1 ? 'product-img img-contain' : 'product-img img-cover'}`}
                    src={this.state.activeImagePath}
                />
                <div className='sub-images-container d-flex'>
                    {subImages}
                </div>
            </div>

            <div className='product-container'>
                <div className='creators'>
                    <div className='main-creator text'>
                        <div className='d-flex justify-content-around align-items-center'>
                            <img // FIXME S3にuserの場所作る
                                src={owner.profilePhoto}
                                className='owner-img'
                            />
                            <div className='main-creator'>
                                <p className='subject'>
                                    {owner.studentClass}
                                    <span className='name'>{owner.studentName}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='creator-box'>
                    <h2>Theme</h2>
                    <p className='theme-text'>
                        {this.state.product.theme}
                    </p>
                </div>
                <div className='creator-box concept'>
                    <h2>Concept</h2>
                    <p className='text'>
                        {this.state.product.concept}
                    </p>
                </div>

                <div className='creator-box'>
                    <div
                        className={`${this.state.product.genre === 'FASHION' ? 'made-by' : 'made-by block'}`}
                    >
                        made by
                        <div
                            className={`${this.state.product.genre === 'FASHION' ? 'member-list' : 'members-list'}`}
                        >
                            {members}
                        </div>
                    </div>
                </div>
            </div>

            <div className='bottom'>
                <button className='vote-button' onClick={this.execVote}>
                    <Icon name='crown'/>
                    {voteBtn}
                </button>
            </div>

            {/* <Footer id={this.state.product.productId}/> */}
            <Footer entryOrder={entryOrder} product={this.state.product} />
            </Screen>
        );
    }

    private voteSwitch = async (e: any) => {
        e.preventDefault();
        if (this.state.deleteImgSelect === false) return;
        if (!this.state.product) return;
        if (!this.state.deleteSelectProductId) return;

        const product = this.state.product;
        const deleteProductId = this.state.deleteSelectProductId;

        await VoteService.vote('DELETE', deleteProductId, product.genre);
        await VoteService.vote('POST', product.productId, product.genre);

        this.setState({
            showVoteModal: true,
            reVoteModal: false,
            deleteImgSelect: false,
        });
    }

    private execVote = (e: any) => {
        if (!this.state.product) return;
        const product = this.state.product;

        e.preventDefault();
        // alert('投票期間外となっています。運営にお問い合わせください。');

        const appManager = ApplicationManager.instance;

        if (VoteService.includeVoteId(product)) {
            VoteService.vote('DELETE', product.productId, product.genre);
            alert('投票を取り消しました。');
        } else if (VoteService.canIncrement(product.genreLowerCase)) {
            VoteService.vote('POST', product.productId, product.genre);
            this.setState({showVoteModal: true});
        } else {
            this.setState({reVoteModal: true});
        }
    }

    private selectDeleteImage = (e: any) => {
        const selectedImg = e.target;
        const selectProductId = Number(e.currentTarget.attributes['data-product-id'].value);

        if (selectedImg.className === 're-vote-product-image') {
            // 新規選択
            this.setState({deleteImgSelect: true, deleteSelectProductId: selectProductId});
            document.querySelectorAll('.delete-image-box .select').forEach(d => d.classList.remove('select'));
            selectedImg.classList.add('select');
            document.querySelectorAll('.re-vote-button').forEach(d => d.classList.add('button-active'));
        } else {
            // 既に選択済みの場合は取り消す
            this.setState({deleteImgSelect: false});
            document.querySelectorAll('.delete-image-box .select').forEach(d => d.classList.remove('select'));
            document.querySelectorAll('.re-vote-button').forEach(d => d.classList.remove('button-active'));
        }
    }

    private changeActiveImage = (e: any) => {
        const clickedImg = e.target;

        document.querySelectorAll('.sub-images-container .active').forEach(d => {
            d.classList.remove('active');
            if (d.parentElement) d.parentElement.classList.add('cover');
        });

        clickedImg.classList.add('active');
        e.currentTarget.classList.remove('cover');

        if (clickedImg.naturalHeight < clickedImg.naturalWidth || clickedImg.src.indexOf('/01.') !== -1) {
            document.querySelectorAll('.product-img').forEach(d => {
                d.classList.remove('img-cover');
                d.classList.add('img-contain');
            });
        } else if (clickedImg.naturalHeight > clickedImg.naturalWidth || clickedImg.src.indexOf('/01.') === -1) {
            document.querySelectorAll('.product-img').forEach(d => {
                d.classList.remove('img-contain');
                d.classList.add('img-cover');
            });
        }
        this.setState({activeImagePath: clickedImg.src});
    }
}
