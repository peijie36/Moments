import React from 'react';
import { useState } from 'react';

export function MobileFilter(props) {
    const [includePhotography, setPhotography] = useState(false);
    const [includeDigital, setDigital] = useState(false);
    const [includePainting, setPainting] = useState(false);

    let regular = "btn filters";
    let active = "btn filters active";
    let photoButton = regular;
    let digitalButton = regular;
    let paintingButton = regular;

    if(includePhotography) {
        photoButton = active;
        digitalButton = regular;
        paintingButton = regular;
    } else if(includeDigital) {
        photoButton = regular;
        digitalButton = active;
        paintingButton = regular;
    } else if(includePainting) {
        photoButton = regular;
        digitalButton = regular;
        paintingButton = active;
    } else {
        photoButton = regular;
        digitalButton = regular;
        paintingButton = regular;
    }

    const pressPhotography = (event) => {
        props.selectFilter(!includePhotography, false, false);
        setPhotography(!includePhotography);
        setDigital(false);
        setPainting(false);
    }

    const presskDigital = (event) => {
        props.selectFilter(false, !includeDigital, false);
        setDigital(!includeDigital);
        setPhotography(false);
        setPainting(false);
    }

    const pressPainting = (event) => {
        props.selectFilter(false, false, !includePainting);
        setPainting(!includePainting);
        setDigital(false);
        setPhotography(false);
    }

    return (
        <div className="d-flex align-items-center justify-content-around">
            <button onClick={pressPhotography} type="button" className={photoButton}>photography</button>
            <button onClick={presskDigital} type="button" className={digitalButton}>digital</button>
            <button onClick={pressPainting} type="button" className={paintingButton}>painting</button>
        </div>
    )
}