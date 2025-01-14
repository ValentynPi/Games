import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Button = styled(Link)`
  display: inline-block;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
  text-decoration: none;
  border: none;
  font-size: 16px;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`; 