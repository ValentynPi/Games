import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export const ShopContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
`;

export const CategoryTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: #3498db #1a1a2e;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #1a1a2e;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #3498db;
    border-radius: 6px;
  }
`;

export const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.$active ? 
    'linear-gradient(135deg, #3498db, #2980b9)' : 
    'rgba(52, 152, 219, 0.1)'};
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.$active ? '#3498db' : 'rgba(52, 152, 219, 0.2)'};

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.$active ? 
      'linear-gradient(135deg, #3498db, #2980b9)' : 
      'rgba(52, 152, 219, 0.2)'};
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.2);
  }
`;

export const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

export const ItemCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${fadeIn} 0.5s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    border-color: rgba(52, 152, 219, 0.5);
    
    img {
      transform: scale(1.05);
    }
  }
`;

export const ItemImage = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background: ${props => props.style?.background || 'rgba(0, 0, 0, 0.2)'};
  box-shadow: ${props => props.style?.boxShadow || 'none'};
  border: ${props => props.style?.border || 'none'};
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
`;

export const ItemTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const ItemRarity = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: rgba(0, 0, 0, 0.5);
  color: ${props => props.color};
  backdrop-filter: blur(5px);
  border: 1px solid ${props => props.color};
  box-shadow: 0 2px 10px ${props => props.color}40;
`;

export const PriceTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #f1c40f;
  margin-top: auto;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const CoinIcon = styled.span`
  font-size: 1.4rem;
  animation: ${float} 2s ease-in-out infinite;
`;

export const BuyButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.equipped ? 
    'linear-gradient(135deg, #e74c3c, #c0392b)' : 
    'linear-gradient(135deg, #3498db, #2980b9)'};
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
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
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContent = styled.div`
  background: rgba(26, 26, 46, 0.95);
  padding: 2rem;
  border-radius: 20px;
  max-width: 500px;
  width: 90%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  border: 1px solid rgba(52, 152, 219, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

export const ItemDescription = styled.p`
  color: #a0aec0;
  text-align: center;
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.6;
`;