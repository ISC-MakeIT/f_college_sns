import * as React from 'react';
import {ProductService} from '../services';
import {RouteComponentProps} from 'react-router-dom';
import Screen from './screen';
import {Product} from '../entities';
import {Loading, Mask, ProductShowFooter as Footer} from '../components';
// import {Loading, Icon, Mask, ProductShowFooter as Footer, VotedModal, RefuseVoteModal} from '../components';
// import { ApplicationManager } from '../application_manager';
import { VoteService } from '../services/vote';
import { PhotoService } from '../services/photo';

interface Props extends RouteComponentProps < { id: number } > {}

interface State {
    product: Product | null;
    viewImageMask: boolean;
    activeImagePath?: string;
    // showVoteModal: boolean;
    // refuseVoteModal: boolean;
    // deleteImgSelect: boolean;
    // deleteSelectProductId: number | null;
    // suggestedProducts: any;
    // votedProducts: any;
}

export class ProductShow extends React.PureComponent < Props, State > {
    constructor(props: Props) {
        super(props);
        this.state = {
            product: null,
            viewImageMask: false,
            // showVoteModal: false,
            // refuseVoteModal: false,
            // deleteImgSelect: false,
            // deleteSelectProductId: null,
            // suggestedProducts: [],
            // votedProducts: [],
};
    }

    public async componentDidMount() {
        const product = await ProductService.get(this.props.match.params.id);

        // let suggestedProductIds: number[] = [];
        // while (suggestedProductIds.length < 5) {
        //     const rand = Math.floor(Math.random() * 50) + 1;
        //     suggestedProductIds.push(rand);
        //     suggestedProductIds = [...new Set(suggestedProductIds)];
        // }
        // const suggestedProducts = await ProductService.asyncMap(suggestedProductIds, async (id: number) => {
        //     return await ProductService.get(id);
        // });
        // const appManager = ApplicationManager.instance;
        // const votedProducts = await ProductService.asyncMap(appManager.voteIds[product.genreLowerCase], async (id: number) => {
        //     return await ProductService.get(id);
        // });

        this.setState({
            product: product || null,
            activeImagePath: product.headShot,
            // suggestedProducts,
            // votedProducts,
        });
    }

    public render() {

        if (this.state.product == null || this.state.product.photos == null) return <Loading />;

        const subImages = this.state.product.photos.map((img, index) => {
            return (
                <p
                    key={index}
                    className={`img-container ${this.state.activeImagePath !== img ? 'cover' : null}`}
                    onClick={this.changeActiveImage}
                >
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

        const voteBtn = (VoteService.includeVoteId(this.state.product.productId, this.state.product.genreLowerCase)) ?
            (<span>取り消す</span>) : (<span>投票する</span>);

        return (
            <Screen name='product-show' showBackButton>
                <Mask
                    open={this.state.viewImageMask}
                    className='viewImageMask'
                    onClose={() => this.setState({ viewImageMask: false})}
                >
                    <img
                        className='view-image'
                        src={this.state.activeImagePath}
                    />
                </Mask>

                {/*
                    <VotedModal
                        open={this.state.showVoteModal}
                        product={this.state.product}
                        suggestedProducts={this.state.suggestedProducts}
                        onClose={() => this.setState({showVoteModal: false})}
                    />

                    <RefuseVoteModal
                        open={this.state.refuseVoteModal}
                        votedProducts={this.state.votedProducts}
                        onClose={() => this.setState({refuseVoteModal: false})}
                        voteSwitch={(e: any) => this.voteSwitch(e)}
                        selectDeleteImage={(e: any) => this.selectDeleteImage(e)}
                    />
                */}

                <div className='image-container'>
                    <div className='image-container'>
                        <img
                            className={`${this.state.product.headShot.indexOf('/01.') !== -1 ? 'product-img img-contain' : 'product-img img-cover'}`}
                            src={this.state.activeImagePath}
                            onClick={this.viewImage}
                        />
                        <img
                            src={PhotoService.getS3PhotoPath('view-icon.png', 'app/logos')}
                            className='image-view-icon'
                            onClick={this.viewImage}
                        />
                        <div className='sub-images-container d-flex'>
                            {subImages}
                        </div>
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
                                </p>
                                <p className='subject'>
                                    <span className='name'>{owner.studentName}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='creator-box'>
                    <h2>Theme</h2>
                    <p className='theme-text'>
                    <span className='product-id'>{entryOrder}<span>.</span></span>
                    <span className='product_theme'>
                        {this.state.product.theme}
                    </span>
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

            {/*
                <div className='bottom'>
                    <button className='vote-button' onClick={this.execVote}>
                        <Icon name='crown'/>
                        {voteBtn}
                    </button>
                </div>
            */}

            {/* <Footer id={this.state.product.productId}/> */}
            <Footer entryOrder={entryOrder} product={this.state.product} />
            </Screen>
        );
    }

    // private voteSwitch = async (e: any) => {
    //     e.preventDefault();
    //     if (this.state.deleteImgSelect === false) return;
    //     if (!this.state.product) return;
    //     if (!this.state.deleteSelectProductId) return;
    //     const target = e.currentTarget;
    //     target.disable = true;

    //     const product = this.state.product;
    //     const deleteProductId = this.state.deleteSelectProductId;

    //     await VoteService.vote('DELETE', deleteProductId, product.genreLowerCase);
    //     await VoteService.vote('POST', product.productId, product.genreLowerCase);

    //     target.disable = false;
    //     this.setState({
    //         showVoteModal: true,
    //         refuseVoteModal: false,
    //         deleteImgSelect: false,
    //     });
    // }

    // private execVote = async (e: any) => {
    //     if (!this.state.product) return;
    //     e.preventDefault();
    //     const target = e.currentTarget;
    //     target.disable = true;
    //     const product = this.state.product;
    //     const appManager = ApplicationManager.instance;

    //     if (VoteService.includeVoteId(product.productId, product.genreLowerCase)) {
    //         alert('投票を取り消しました。');
    //         VoteService.vote('DELETE', product.productId, product.genreLowerCase);
    //         const votedProducts = await ProductService.asyncMap(appManager.voteIds[product.genreLowerCase], async (id: number) => {
    //             return await ProductService.get(id);
    //         });
    //         this.setState({ votedProducts });

    //     } else if (VoteService.canIncrement(product.genreLowerCase)) {
    //         VoteService.vote('POST', product.productId, product.genreLowerCase);
    //         this.setState({showVoteModal: true});
    //     } else {
    //         this.setState({refuseVoteModal: true});
    //     }
    //     target.disable = false;
    // }
    // private selectDeleteImage = (e: any) => {
    //     const selectedImg = e.target;
    //     const selectProductId = Number(e.currentTarget.attributes['data-product-id'].value);

    //     if (selectedImg.className === 're-vote-product-image') {
    //         // 新規選択
    //         this.setState({deleteImgSelect: true, deleteSelectProductId: selectProductId});
    //         document.querySelectorAll('.delete-image-box .select').forEach(d => d.classList.remove('select'));
    //         selectedImg.classList.add('select');
    //         e.currentTarget.style.backgroundColor = '#31282C';
    //         document.querySelectorAll('.re-vote-button').forEach(d => d.classList.add('button-active'));
    //     } else {
    //         // 既に選択済みの場合は取り消す
    //         this.setState({deleteImgSelect: false});
    //         document.querySelectorAll('.delete-image-box .select').forEach(d => d.classList.remove('select'));
    //         document.querySelectorAll('.re-vote-button').forEach(d => d.classList.remove('button-active'));
    //     }
    // }

    private changeActiveImage = (e: any) => {
        const clickedImg = e.target;

        document.querySelectorAll('.sub-images-container .active').forEach(d => {
            d.classList.remove('active');
            if (d.parentElement) d.parentElement.classList.add('cover');
        });

        clickedImg.classList.add('active');
        e.currentTarget.classList.remove('cover');

        // s3/**/\d/\d.jpgの画像 || beatuty, fashionの01
        const containImg = (clickedImg.src.search(/beauty\/(\d*)*\/02./) !== -1 || clickedImg.src.search(/(beauty|fashion)\/\d*\/01./) !== -1);
        if (containImg || clickedImg.naturalHeight < clickedImg.naturalWidth) {
            document.querySelectorAll('.product-img').forEach(d => {
                d.classList.remove('img-cover');
                d.classList.add('img-contain');
            });
        } else {
            document.querySelectorAll('.product-img').forEach(d => {
                d.classList.remove('img-contain');
                d.classList.add('img-cover');
            });
        }

        this.setState({activeImagePath: clickedImg.src});
    }

    private viewImage = (e: any) => {
        this.setState({viewImageMask: true});
    }
}
