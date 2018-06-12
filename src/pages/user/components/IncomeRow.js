import { Component } from 'react';
import styles from './InviteItem.less';
import { dateFormat } from '../../../utils/filters';

class IncomeRow extends Component {

  componentDidMount() {
    
  }

  render() {
    const { children } = this.props.item;

    console.log(children)

    const childrenView = children ? children.map(item => {
      console.log(item)
    }) : '';

    return (
      <div className={styles.item}>

      </div>
    );
  }
}

export default IncomeRow;
