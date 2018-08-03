import * as React from 'react';

interface Props {
    name: string;
}

export default class Screen extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        console.info(`${this.props.name}'s screen`); // tslint:disable-line:no-console
        return (
            <div className={`screen ${this.props.name}`} >
                <div className='contents'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
