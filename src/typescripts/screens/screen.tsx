import * as React from 'react';

interface Props {
    name: string;
}

export default class Screen extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        return (
            <div className={`screen ${this.props.name}`} >
                <div className='contents'>
                    <h1>ここが {this.props.name}</h1>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
