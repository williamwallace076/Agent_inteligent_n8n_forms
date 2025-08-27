import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RobotSVG from '../assets/RobotSVG';
import './Resultado.css';

export default function Resultado() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Pega os dados passados pela navegação
  const { cargoPrevisto, error } = location.state || { cargoPrevisto: null, error: 'Nenhum dado recebido.' };

  const robotExpression = error ? "sad" : "happy";
  const robotColor = error ? "#ef4444" : "#22c55e";
  const robotSpeak = error ? error : `Parabéns! Eu acho que seu cargo ideal é ${cargoPrevisto}.`;

  return (
    <div className="page-container-result">
      <main className="main-content-result">
        <RobotSVG 
          expression={robotExpression} 
          speak={robotSpeak} 
          color={robotColor} 
          size={300} 
          blink 
        />
        <div className="result-card">
          <h2 className="result-title">Resultado da Análise</h2>
          {error ? (
            <p className="result-error-text">{error}</p>
          ) : (
            <p className="result-text">
              Sugerimos o cargo de: 
              <strong className="result-cargo">{cargoPrevisto}</strong>
            </p>
          )}
        </div>
        <button onClick={() => navigate('/')} className="result-button">
          Tentar Novamente
        </button>
      </main>
      <footer className="footer">
        <p>All Rights reserved to authors.</p>
      </footer>
    </div>
  );
}
