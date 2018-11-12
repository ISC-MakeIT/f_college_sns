import * as React from 'react';

export class Footer extends React.Component<{}, {}> {

    public render() {
        return (
            <footer>
                <nav id='footer_menu'>
                    <div className='footer_fashion'>ファッション部門</div>
                    <div className='footer_beauty'>ビューティー部門</div>
                </nav>
            </footer>
        );
    }
}
