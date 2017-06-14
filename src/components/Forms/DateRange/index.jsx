import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import areIntlLocalesSupported from 'intl-locales-supported';
import DatePicker from 'material-ui/DatePicker';

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['ru'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
}

const Wrapper = styled.div`
  display: flex;

  > * {
    min-width: 0;
    flex-grow: 1;
    flex-basis: 1px;

    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`;

class DateRange extends PureComponent {
  constructor(props) {
    super(props);

    const { startDate, endDate, minDate, maxDate } = props;

    this.state = {
      startDate: startDate || minDate || null,
      endDate: endDate || maxDate || null,
    };

    this.onStartChange = this.onChange.bind(this, 'start');
    this.onEndChange = this.onChange.bind(this, 'end');
  }

  onChange(type, e, date) {
    const { onChange } = this.props;
    const { startDate, endDate } = this.state;
    const dateObj = new Date(date);
    let newDate;

    if (type === 'start') {
      newDate = (endDate && dateObj > endDate) ? endDate : dateObj;
    } else if (type === 'end') {
      newDate = (startDate && dateObj < startDate) ? startDate : dateObj;
    }

    this.setState({
      [`${type}Date`]: newDate,
    }, () => {
      if (!onChange) {
        return;
      }

      onChange([
        this.state.startDate,
        this.state.endDate,
      ]);
    });
  }

  renderDatepicker(value, label, onChange) {
    const { minDate, maxDate } = this.props;
    const style = {
      maxWidth: '100%',
    };

    return (
      <DatePicker
        value={value}
        floatingLabelText={label}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        textFieldStyle={style}
        DateTimeFormat={DateTimeFormat}
      />
    );
  }

  render() {
    return (
      <Wrapper>
        {this.renderDatepicker(this.state.startDate, 'От (дата)', this.onStartChange)}
        {this.renderDatepicker(this.state.endDate, 'До (дата)', this.onEndChange)}
      </Wrapper>
    );
  }
}

DateRange.propTypes = {
  startDate: PropTypes.shape(DatePicker.propTypes.object),
  endDate: PropTypes.shape(DatePicker.propTypes.object),
  minDate: PropTypes.shape(DatePicker.propTypes.minDate),
  maxDate: PropTypes.shape(DatePicker.propTypes.maxDate),
  onChange: PropTypes.func,
};

export default DateRange;
