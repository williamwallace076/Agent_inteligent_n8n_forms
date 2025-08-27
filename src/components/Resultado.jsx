import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RobotSVG from '../assets/RobotSVG';
import './Resultado.css';

const descricoesCargos = {
  'analise e estrategia': 'Focado em analisar o cenário atual e futuro para definir os melhores caminhos e planos de ação que guiarão o sucesso da organização.',
  'cientista de dados': 'Usa métodos científicos e algoritmos para extrair conhecimento e insights valiosos de dados complexos.',
  'engenheiro de dados': 'Projeta, constrói e mantém a infraestrutura (pipelines) que torna os dados acessíveis e confiáveis para toda a empresa.',
  'analista de dados': 'Coleta, processa e realiza análises estatísticas para transformar dados em informações que ajudam a tomar melhores decisões.',
  'analista de bi': 'Cria relatórios e dashboards visuais para monitorar o desempenho do negócio e comunicar tendências de mercado de forma clara.',
  'engenheiro de machine learning': 'Especialista em construir e implementar modelos de inteligência artificial em ambientes de produção para resolver problemas reais.',
  'desenvolvedor': 'Cria e mantém sistemas, sites e aplicações de software, escrevendo o código que dá vida às ideias.',
  'engenheiro de software': 'Cria e mantém sistemas, sites e aplicações de software, escrevendo o código que dá vida às ideias.',
  'analista de sistemas': 'Cria e mantém sistemas, sites e aplicações de software, escrevendo o código que dá vida às ideias.',
  'analista de negocios': 'Atua como uma ponte entre as áreas de negócio e a tecnologia, identificando problemas e propondo soluções eficientes.',
  'dba': 'Garante a segurança, a performance e a integridade dos bancos de dados, o coração da informação de uma empresa.',
  'product manager': 'Define a visão e a estratégia de um produto, decidindo o que será construído para maximizar o valor para o cliente.',
  'product owner': 'Define a visão e a estratégia de um produto, decidindo o que será construído para maximizar o valor para o cliente.',
  'professor': 'Profissional dedicado ao ensino e à pesquisa, formando novos talentos e expandindo o conhecimento na sua área.',
  'ciencia de dados e estatistica': 'Combina estatística avançada, computação e conhecimento de negócio para descobrir padrões e prever tendências futuras a partir dos dados.',
  'analista de suporte': 'Oferece assistência técnica a utilizadores, resolvendo problemas de hardware e software para garantir a produtividade.',
  'analista de inteligencia de mercado': 'Investiga o mercado e a concorrência para encontrar oportunidades e tendências que possam guiar a estratégia da empresa.',
  'analytics engineer': 'Organiza e modela dados brutos, criando uma base sólida e confiável para que os analistas possam trabalhar com mais eficiência.'
};

function obterDescricao(cargoFormatado) {
  if (!cargoFormatado) return '';
  const chaveBusca = cargoFormatado.toLowerCase();
  for (const chave in descricoesCargos) {
    if (chaveBusca.includes(chave)) {
      return descricoesCargos[chave];
    }
  }
  return 'A sua combinação de competências é única! Este resultado indica um perfil versátil com potencial para diversas outras áreas.';
}


export default function Resultado() {
  const navigate = useNavigate();
  const location = useLocation();

  // Pega os dados passados pela navegação
  const { cargoPrevisto, error } = location.state || { cargoPrevisto: null, error: 'Nenhum dado recebido.' };

  const robotExpression = error ? "sad" : "happy";
  const robotColor = error ? "#ef4444" : "#22c55e";
  const robotSpeak = error ? (error) : (
    <>
      Parabéns! Eu acho que seu cargo ideal é <strong>{cargoPrevisto}</strong>.
    </>
  );

  const descricaoCargo = obterDescricao(cargoPrevisto); // Obtém a descrição

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
            <>
              <p className="result-text">
                Sugerimos o cargo de:
                <strong className="result-cargo">{cargoPrevisto}</strong>
              </p>
              <p className="result-description">{descricaoCargo}</p>
            </>
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
