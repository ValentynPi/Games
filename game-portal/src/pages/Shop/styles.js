import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
  50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
  100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
`;

export const ShopContainer = styled.div`
  padding: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const CategoryTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? '#3498db' : '#2c3e50'};
  color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#2980b9' : '#34495e'};
  }
`;

export const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

export const ItemCard = styled.div`
  background: #2c3e50;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

export const ItemTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 1.2rem;
`;

export const ItemPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f1c40f;
  font-weight: bold;
`;

export const CoinIcon = styled.span`
  font-size: 1.2rem;
`;

export const BuyButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  background: ${props => props.disabled ? '#95a5a6' : '#2ecc71'};
  color: white;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background 0.2s;

  &:hover {
    background: ${props => props.disabled ? '#95a5a6' : '#27ae60'};
  }
`;

export const EquipButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  background: ${props => props.equipped ? '#e74c3c' : '#3498db'};
  color: white;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${props => props.equipped ? '#c0392b' : '#2980b9'};
  }
`;

export const PreviewModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #2c3e50;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
`;

export const ItemDescription = styled.p`
  color: #bdc3c7;
  text-align: center;
  margin: 0;
`;

export const PriceTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f1c40f;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const ItemRarity = styled.span`
  color: ${props => props.color};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;