import styled from 'styled-components';

export const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  margin: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`; 