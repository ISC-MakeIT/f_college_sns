import * as React from 'react';
import { Header } from '../components/header';
// import { Footer } from '../components/footer';

interface Props {
    name: string;
    style?: string;
    hideHeader?: boolean;
    hideFooter?: boolean;
    showBackButton?: boolean;
    headerAbsolute?: boolean;
}

export default class Screen extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    public render () {
        console.info(`${this.props.name}'s screen`); // tslint:disable-line:no-console
        const header = this.props.hideHeader ? null
            : <Header showBackButton={this.props.showBackButton} headerAbsolute={this.props.headerAbsolute} />;
        // const footer = this.props.hideFooter ? null : <Footer/>;

        return (
            <div className={`screen ${this.props.name}`} >
                {header}
                <div className={`contents ${this.props.style ? this.props.style : ''}`}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
