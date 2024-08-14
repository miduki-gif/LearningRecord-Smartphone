import PropTypes from 'prop-types';
import { createContext } from 'react';
import { AddRecord } from '../../utils/AddRecord';

export const RecordDataContext = createContext();

export const RecordProvider = ({ children }) => {
    AddRecord();

    return (
        <RecordDataContext.Provider value={ AddRecord }>
            {children}
        </RecordDataContext.Provider>
    );
};

//関数型でかつ必須であることを保証
RecordProvider.propTypes = {
    children: PropTypes.func.isRequired,
  };





