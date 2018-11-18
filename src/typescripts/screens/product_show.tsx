import * as React from 'react';
import {ProductService} from '../services';
import {RouteComponentProps, Link} from 'react-router-dom';
import Screen from './screen';
import {Product, ProductList} from '../entities';
import {Loading, Icon, Modal, ProductShowFooter as Footer} from '../components';
import {PhotoService} from '../services/photo';

interface Props extends RouteComponentProps < { id: number } > {}

interface State {
    product: Product | null;
    activeImagePath?: string;
    showVoteModal: boolean;
    reVoteModal: boolean;
    deleteImgSelect: boolean;
}

export class ProductShow extends React.Component < Props, State > {
    constructor(props: Props) {
        super(props);
        this.state = {
            product: null,
            showVoteModal: false,
            reVoteModal: false,
            deleteImgSelect: false,
        };
    }

    public async componentDidMount() {
        const product = await ProductService.get(this.props.match.params.id);

        if (product && product.photos) {
            this.setState({product});
            this.setState({activeImagePath: product.photos[0] || ''});
        }
    }

    public render() {

        if (this.state.product == null || this.state.product.photos == null) return <Loading />;

        // TODO activeIMGのClass周りの動的な書き換え
        const subImages = this.state.product.photos.filter(e => e !== this.state.activeImagePath).map((img, index) => {
            // const path = PhotoService.getS3PhotoPath(img, 'products/sample');
            return (
                <p key={index} className='img-container cover' onClick={this.changeActiveImage}>
                    <img className='img non-active' src={img} width={100} height={100}/>
                </p>
            );
        });

        subImages.unshift(
            <p className='img-container' onClick={this.changeActiveImage}>
                <img
                    className='img active'
                    src={this.state.activeImagePath}
                    width={100}
                    height={100}
                />
            </p>,
        );

        const owner = this.state.product.owner;

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
                    <p className='delete-image-box' onClick={this.selectDeleteImage}>
                        <img
                            className='re-vote-product-image'
                            src='http://www.marymagdalene.jp/contents/outwear/254/0401/254-0401_06.jpg'
                        />
                    </p>
                    <p className='delete-image-box' onClick={this.selectDeleteImage}>
                        <img
                            className='re-vote-product-image'
                            src='http://www.marymagdalene.jp/contents/outwear/254/0401/254-0401_06.jpg'
                        />
                    </p>
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
                    <img className='product-thumb' src={this.state.activeImagePath}/>
                    <div className='right-container'>
                        <p className='right-container__title'>Strongly beautiful pirate</p>
                            made by
                        <p className='creator'>野口 愛華</p>
                    </div>
                </div>

            {/* 画像リンクをカードで何個か出す。 */}
                <p className='suggest-product-title'>他の作品も閲覧しませんか？</p>
                <div className='suggest-product-container'>
                    <div className='suggested-product'>
                        <img
                            className='short-product-thumb'
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYnpY34LsW2NnIEmKdDBBdtD7DRMZX-dkAqubG3SxVasCkEbUbiQ'
                        />
                        <span className='product-label'>パンドラの箱</span>
                    </div>
                    <div className='suggested-product'>
                        <img
                            className='short-product-thumb'
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYnpY34LsW2NnIEmKdDBBdtD7DRMZX-dkAqubG3SxVasCkEbUbiQ'
                        />
                        <span className='product-label'>パンドラの箱</span>
                    </div>
                    <div className='suggested-product'>
                        <img
                            className='short-product-thumb'
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYnpY34LsW2NnIEmKdDBBdtD7DRMZX-dkAqubG3SxVasCkEbUbiQ'
                        />
                    <span className='product-label'>パンドラの箱</span>
                    </div>
                    <div className='suggested-product'>
                        <img
                            className='short-product-thumb'
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYnpY34LsW2NnIEmKdDBBdtD7DRMZX-dkAqubG3SxVasCkEbUbiQ'
                        />
                    <span className='product-label'>パンドラの箱 </span>
                    </div>
                </div>

                <button className='vote-button-ext' onClick={() => this.setState({showVoteModal: false})}>
                    <span>閉じる</span>
                </button>
            </Modal>

            <div className='image-container'>
                <img className='product-img' src={this.state.activeImagePath}/>
                <div className='sub-images-container d-flex'>
                    {subImages}
                </div>
            </div>

            <div className='product-container'>
                <div className='creators'>
                    <div className='main-creator text'>
                        <div className='d-flex justify-content-around align-items-center'>
                            <img // FIXME S3にuserの場所作る
                                src='/assets/images/users/yamashitamizuki_prof.jpg'
                                className='owner-img'
                            />
                            <div className='main-creator'>
                                <p className='subject'>
                                    {owner.studentClass}
                                    <span className='name'>{owner.studentName}</span>
                                </p>

                                <p className='concept'>
                                    {this.state.product.theme}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='concept'>
                    <h2>Creator Comment??????</h2>
                    <p className='text'>
                        {this.state.product.concept}
                    </p>
                </div>
            </div>

            <div className='bottom'>
                <button className='vote-button' onClick={this.execVote}>
                    <Icon name='crown'/>
                    <span>投票する</span>
                </button>
            </div>

            <Footer id={this.state.product.productId}/>
            </Screen>
        );
    }

    private voteSwitch = (e: any) => {
        if (this.state.deleteImgSelect === true) {
            e.preventDefault();
            this.setState({
                showVoteModal: true,
                reVoteModal: false,
                deleteImgSelect: false,
            });
        }
    }

    private execVote = (e: any) => {
        e.preventDefault();
        // TODO Apiにvote
        // this.setState({showModal: true});
        // これは投票キャンセル用モーダル
        // キャンセル後は自動で投票
        this.setState({reVoteModal: true});
    }

    private selectDeleteImage = (e: any) => {
        const selectedImg = e.target;
        if (selectedImg.className === 're-vote-product-image') {
            // 新規選択
            this.setState({deleteImgSelect: true});
            document.querySelectorAll('.delete-image-box .select')
                    .forEach(d => {
                        d.classList.remove('select');
                    });
            selectedImg.classList.add('select');
            document.querySelectorAll('.re-vote-button')
                .forEach(d => {
                d.classList.add('button-active');
                });
        } else {
            // 既に選択済みの場合は取り消す
            this.setState({deleteImgSelect: false});
            document.querySelectorAll('.delete-image-box .select')
            .forEach(d => {
                d.classList.remove('select');
            });
            document.querySelectorAll('.re-vote-button')
            .forEach(d => {
                d.classList.remove('button-active');
            });
        }
    }

    private changeActiveImage = (e: any) => {
        const clickedImg = e.target;

        document.querySelectorAll('.sub-images-container .active')
                .forEach(d => {
                    d.classList.remove('active');
                    if (d.parentElement) d.parentElement.classList.add('cover');
                });

        clickedImg.classList.add('active');
        e.currentTarget.classList.remove('cover');
        this.setState({activeImagePath: clickedImg.src});
    }
}
