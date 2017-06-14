import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import Title from 'components/Title';

const Wrapper = styled.aside`
  display: flex;
  width: 100%;
`;

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Header = styled.header`
  padding: 0 15px;
`;

const Content = styled.div`
  padding: 10px 15px;
  flex-grow: 1;
`;

const Footer = styled.div`
  padding: 10px 15px 15px;
`;

const Sidebar = ({ children, className, footer, title }) => (
  <Wrapper className={className}>
    <StyledPaper>
      {
        !!title &&
        <Header>
          <Title style={{ padding: 0, marginBottom: 0 }} divider size="l">
            {title}
          </Title>
        </Header>
      }
      <Content>
        {Children.toArray(children)}
      </Content>
      {
        !!footer &&
        <Footer>
          {footer}
        </Footer>
      }
    </StyledPaper>
  </Wrapper>
);

Sidebar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default Sidebar;
