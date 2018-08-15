import * as React from 'react';
import { PhotoService } from '../services/photo';

interface Props {
    photoName: string;
}

export const Photo: React.StatelessComponent<Props> = props => {
    const imagePath = PhotoService.buildPhotoPath(props.photoName);
    return (
        <div className='photos' >
            <img src={imagePath} />
        </div>
    );
};
