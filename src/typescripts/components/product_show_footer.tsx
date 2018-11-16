import * as React from 'react';

interface Props {
    id: number;
}

export class ProductShowFooter extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props);
    }

    public render() {

        const prevUrl = `/products/${Number(this.props.id) - 1}`;
        const nextUrl = `/products/${Number(this.props.id) + 1}`;

        return (
            <footer>
                <nav id='footer_menu'>
                    <div className='footer_fashion' onClick={() => this.linkClick(prevUrl)} >＜ PREV</div>
                    <div className='footer_beauty' onClick={() => this.linkClick(nextUrl)} >NEXT ＞</div>
                </nav>
            </footer>
        );
    }

    private currentURL = () => window.location.href.replace(window.location.pathname, '');

    private linkClick = (url: string) => {
        window.location.href = this.currentURL() + url;
    }

}
