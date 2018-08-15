import * as React from 'react';

interface Props {
    photoPath: string;
  }

export const Photo: React.StatelessComponent<Props> = props => (
            <div className='photos' >
                <img src={props.photoPath} />
            </div>
);
