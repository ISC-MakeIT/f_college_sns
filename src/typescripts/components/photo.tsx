import * as React from 'react';
import { PhotoService } from '../services/photo';

interface Props {
    photoName: string;
    dirName: string;
}

export const Photo: React.StatelessComponent<Props> = props => {
    const imagePath = PhotoService.buildPhotoPath(props.photoName, props.dirName);
    return (
        <div className='photo component' >
            <img src={imagePath} />
        </div>
    );
};
