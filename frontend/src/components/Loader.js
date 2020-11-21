import React from 'react';
import Loader from 'react-loader-spinner';

export default class LoaderComponent extends React.Component {
   render() {
    return(
     <Loader
        type="Oval"
        color="#FFFFFF"
        height={20}
        width={50}
        timeout={4000} //2 secs

     />
    );
   }
}
