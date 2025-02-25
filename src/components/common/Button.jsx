import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 12px;
  border: none;
  transition: 0.2s;

  ${({ size }) => {
    switch (size) {
      case 'large':
        return `height: 48px; padding: 12px 36px;`;
      case 'medium':
        return `height: 36px; padding: 8px 36px;`;
      case 'small':
        return `height: 24px; padding: 4px 20px;`;
      default:
        return `height: 36px; padding: 8px 36px;`;
    }
  }}

  ${({ theme, type }) => {
    const colors = theme.colors;
    switch (type) {
      case 'CTA Abled':
      case 'CTA Active':
        return `
          background-color: ${type === 'CTA Active' ? colors.primary[400] : colors.primary[300]};
          color: ${colors.white};
        `;
      case 'CTA Delete':
      case 'CTA Delete Active':
        return `
          background-color: ${type === 'CTA Delete Active' ? colors.secondary[400] : colors.secondary[300]};
          color: ${colors.white};
        `;
      case 'CTA Disabled':
        return `
          background-color: ${colors.gray[300]};
          color: ${colors.white};
          cursor: not-allowed;
          opacity: 0.6;
        `;
      case 'CTA Lined':
        return `
          background-color: ${colors.white};
          color: ${colors.gray[400]};
          border: 1px solid ${colors.gray[400]};
          &:hover {
            background-color: ${colors.gray[100]};
          }
        `;
      default:
        return `
          background-color: ${colors.primary[300]};
          color: ${colors.white};
        `;
    }
  }}
`;

const CustomButton = ({
  size = 'medium',
  type = 'CTA Abled',
  children,
  onClick,
  ...props
}) => {
  return (
    <Button size={size} type={type} onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  type: PropTypes.oneOf([
    'CTA Abled',
    'CTA Active',
    'CTA Delete',
    'CTA Delete Active',
    'CTA Disabled',
    'CTA Lined',
  ]),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default CustomButton;
