import React from 'react';
import './style.scss';

interface NavigationButtonsProps {
  handleNext: () => void;
  handlePrev: () => void;
  closeModal: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  handleNext,
  handlePrev,
  closeModal,
  isLastStep,
  isFirstStep,
}) => {
  return (
    <div className="navigation-buttons">
      {!isFirstStep &&
        !isLastStep && ( // Exibe o botão "Voltar" apenas se não estiver na primeira tela
          <button className="navigation-button" onClick={handlePrev}>
            Voltar
          </button>
        )}
      {isFirstStep && ( // Exibe o botão "Fechar" apenas se estiver na primeira tela
        <button className="navigation-button" onClick={closeModal}>
          Fechar
        </button>
      )}
      {/* Condicional para não renderizar o botão "Avançar" se estiver na última etapa */}
      {!isLastStep && (
        <button className="navigation-button" onClick={handleNext}>
          Avançar
        </button>
      )}

      {/* Se estiver na última etapa, o botão exibido será "Fechar" */}
      {isLastStep && (
        <button className="navigation-button" onClick={handleNext}>
          Fechar
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
