import Types from '../actionTypes';

function ceshiActions (info) {
  return {
    type: Types.CESHI,
    info
  };
}

export function ceshi() {
  return (dispatch) => {

    console.log('ceshiActions')
    dispatch(ceshiActions({ name: 'xiaogang' }));
  }
}
