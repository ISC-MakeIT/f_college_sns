import * as React from 'react';
import {ProductService} from '../services';
import {RouteComponentProps, Link} from 'react-router-dom';
import Screen from './screen';
import {Product} from '../entities';
import { Loading, Icon, Modal } from '../components';
import { PhotoService } from '../services/photo';
import { Footer } from '../components/product_show_footer';

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
      reVoteModal: true,
      deleteImgSelect: false,
    };
  }

  public async componentDidMount() {
    const product = await ProductService.get(this.props.match.params.id);
    this.setState({product});
    this.setState({activeImagePath: product.imageURLPath});
  }

  public render() {

    if (this.state.product === null) return <Loading />;

    // TODO activeIMGのClass周りの動的な書き換え
    const subImages = ['01.png', '02.png', '11.png', '17.png'].map((img, index) => {
      const path = PhotoService.getS3PhotoPath(img, 'products/sample');
      return (
        <p key={index} className='img-container cover' onClick={this.changeActiveImage}>
          <img className='img non-active' src={path} width={100} height={100}/>
        </p>
      );
    });

    const product = this.state.product;

    subImages.unshift(
      <p className='img-container' onClick={this.changeActiveImage}>
        <img
          className='img active'
          src={product.imageURLPath}
          width={100}
          height={100}
        />
      </p>,
    );

    const activeImage = this.state.activeImagePath;

    return (
      <Screen name='product-show' showBackButton>
        <Modal
            open={this.state.reVoteModal}
            heading='投票権がありません'
            className='re-vote-modal'
            onClose={() => this.setState({ reVoteModal: false})}
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
              <span className='product-label'>
                パンドラの箱
              </span>
            </div>
            <div className='suggested-product'>
              <img
                className='short-product-thumb'
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYnpY34LsW2NnIEmKdDBBdtD7DRMZX-dkAqubG3SxVasCkEbUbiQ'
              />
              <span className='product-label'>
                パンドラの箱
              </span>
            </div>
            <div className='suggested-product'>
              <img
                className='short-product-thumb'
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYnpY34LsW2NnIEmKdDBBdtD7DRMZX-dkAqubG3SxVasCkEbUbiQ'
              />
              <span className='product-label'>
                パンドラの箱
              </span>
            </div>
            <div className='suggested-product'>
              <img
                className='short-product-thumb'
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYnpY34LsW2NnIEmKdDBBdtD7DRMZX-dkAqubG3SxVasCkEbUbiQ'
              />
              <span className='product-label'>
                パンドラの箱
              </span>
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
                    ブライダル科 １年
                    <span className='name'>
                      山田花子
                    </span>
                  </p>

                  <p className='concept'>
                    作品コンセプト
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='concept'>
            <h2>Creator Comment</h2>
            <p className='text'>
              ドレスの薔薇っぽいところをがんばりました。 薔薇を薔薇っぽく見せるのに苦労しました。 すごくがんばったのでよろしくお願いします。
            </p>
          </div>
        </div>

        <div className='bottom'>
          <button className='vote-button' onClick={this.execVote}>
            <Icon name='crown'/>
            <span>投票する</span>
          </button>
        </div>
        <Footer/>
      </Screen>
    );
  }

  private voteSwitch = (e: any) => {
    if (this.state.deleteImgSelect === true) {
      e.preventDefault();
      this.setState({showVoteModal: true});
      this.setState({reVoteModal: false});
      this.setState({deleteImgSelect: false});
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

  private changeActiveImage = (e: any) => {
    const clickedImg = e.target;

    document.querySelectorAll('.sub-images-container .active')
            .forEach(d => {
                d.classList.remove('active');
                if (d.parentElement) d.parentElement.classList.add('cover');
            });

    clickedImg.classList.add('active');
    e.currentTarget
     .classList
     .remove('cover');
    this.setState({activeImagePath: clickedImg.src});
  }

  private selectDeleteImage = (e: any) => {
    const selectedImg = e.target;
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
  }
}
