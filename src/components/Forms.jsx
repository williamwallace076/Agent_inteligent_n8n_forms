import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RobotSVG from '../assets/RobotSVG';
import './Forms.css';

export default function Form() {

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      viveBrasil: "TRUE",
      genero: "",
      etnia: "",
      pcd: "",
      nivelEnsino: "",
      estadoMoradia: "",
      formacao: "",
      experienciaDados: "",
      linguagensPreferidas: "",
      cloudPreferida: ""

    }
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [robotExpression, setRobotExpression] = useState("neutral");
  const [robotMessage, setRobotMessage] = useState("Olá! Preencha o formulário e eu vou adivinhar o seu cargo ideal.");

  const viveBrasilValue = watch("viveBrasil", "TRUE");

  // --- FUNÇÃO PARA ATUALIZAR O ROBÔ AO PREENCHER O FORMULÁRIO ---
  const handleFormInput = () => {
    setRobotExpression("thinking");
    setRobotMessage("Hum legal...");
  };



  const onSubmit = async (data) => {
    setRobotMessage("uou ! deixe me ver...");
    setIsLoading(true);
    setRobotExpression("surprised")


    const payload = {
      idade: data.idade,
      genero: data.genero,
      etnia: data.etnia,
      pcd: data.pcd,
      vive_no_brasil: data.viveBrasil,
      estado_moradia: data.viveBrasil === 'TRUE' ? data.estadoMoradia : 'Não se aplica',
      nivel_ensino: data.nivelEnsino,
      formacao: data.formacao,
      tempo_experiencia_dados: data.experienciaDados,
      linguagens_Preferidas: data.linguagensPreferidas,
      bancos_de_dados: data.bancoDados,
      cloud_preferida: data.cloudPreferida,
    };

    try {
      const response = await axios.post(
        "https://primary-production-bd64.up.railway.app/webhook/previsao"
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(payload);
      const cargo = response.data?.cargo_previsto || "Cargo não informado";
      // Navega para a página de resultado passando os dados via state
      const cargoFormatado = formatarCargo(cargo);
      navigate('/resultado', { state: { cargoPrevisto: cargoFormatado, error: null } });
    } catch (err) {
      console.error("Erro ao enviar os dados", err);
      const errorMsg = "Oops! Algo deu errado ao prever seu cargo. Tente novamente.";
      navigate('/resultado', { state: { cargoPrevisto: null, error: errorMsg } });
    } finally {
      setIsLoading(false);
    }
  };

  function formatarCargo(texto) {
    if (!texto || typeof texto !== 'string') {
      return texto || "Cargo não encontrado";
    }

    // Dicionário robusto criado a partir da análise do seu ficheiro CSV.
    // Todas as palavras estão em minúsculas para uma correspondência case-insensitive.
    const palavras = [
      "administrador", "analista", "analise", "analytics", "architect", "arquiteto", "banco",
      "business", "bi", "cientista", "ciencia", "coordenador", "dados", "data", "de",
      "desenvolvedor", "dev", "dba", "dpm", "e", "engineer", "engenheiro",
      "engenharias", "estatistica", "estrategia", "gpm", "inclui", "intelligence", "inteligencia",
      "learning", "machine", "manager", "market", "marketing", "mercado", "ml", "nao",
      "negocios", "opcao", "outra", "outras", "owner", "pm", "po", "product",
      "professor", "redes", "scientist", "seguranca", "sistemas", "software",
      "suporte", "tecnico"
    ].sort((a, b) => b.length - a.length); // Ordena da mais longa para a mais curta.

    let resultado = [];
    let textoRestante = texto;

    while (textoRestante.length > 0) {
      let encontrouPalavra = false;

      for (const palavra of palavras) {
        // Compara em minúsculas, mas extrai da string original para manter a capitalização.
        if (textoRestante.toLowerCase().startsWith(palavra)) {
          const palavraOriginal = textoRestante.substring(0, palavra.length);
          resultado.push(palavraOriginal);
          textoRestante = textoRestante.substring(palavra.length);
          encontrouPalavra = true;
          break;
        }
      }

      // Se nenhuma palavra do dicionário for encontrada, assume que o resto é uma palavra e termina.
      if (!encontrouPalavra) {
        if (textoRestante.length > 0) {
          resultado.push(textoRestante);
        }
        break;
      }
    }

    console.log(resultado.join(' '));


    return resultado.join(' ');
  }


  return (
    <div className="page-container">
      <main className="main-content-form">
        <div className="form-container">
          <h1 className="form-title">
            Descubra qual cargo combina melhor com você !
          </h1>
          <p className="form-subtitle">
            Preencha os campos abaixo para começar.
          </p>

          <form id="form-predicao" onSubmit={handleSubmit(onSubmit)} className="form-body">
            <div>
              <label className="form-label">Idade (anos)</label>
              <input type="number"
                placeholder='Digite a Idade aqui Ex: 19'
                {...register("idade", { required: true, min: 16, max: 90 })}
                className="form-input"
                onInput={handleFormInput} />
              {errors?.idade?.type === "required" && (<p className='form-error'>Campo obrigatório</p>) ||
                errors?.idade?.type === "min" && (<p className='form-error'>A idade minima é 16 anos</p>) ||
                errors?.idade?.type === "max" && (<p className='form-error'>A idade máxima é 90 anos</p>)
              }
            </div>

            <div>
              <label className="form-label" >Gênero:</label>
              <select className="form-input" {...register("genero", { required: true })} onInput={handleFormInput} >
                <option disabled value="">Escolha...</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Prefiro não informar">Prefiro não informar</option>
              </select>
              {errors?.genero?.type === "required" && (<p className='form-error'>Campo obrigatório</p>)}
            </div>

            <div>
              <label className="form-label">Etnia</label>
              <select {...register("etnia", { required: true })} className="form-input" onInput={handleFormInput}>
                <option disabled value="">Escolha...</option>
                <option value="Branca">Branca</option>
                <option value="Parda">Parda</option>
                <option value="Preta">Preta</option>
                <option value="Amarela">Amarela</option>
                <option value="Prefiro não informar">Prefiro não informar</option>
                <option value="Indígena">Indígena</option>
                <option value="Outra">Outra</option>
              </select>
              {errors?.etnia?.type === "required" && (<p className='form-error'>Campo obrigatório</p>)}
            </div>

            <div>
              <label className="form-label">PCD</label>
              <select {...register("pcd", { required: true })}
                className="form-input"
                onInput={handleFormInput}>
                <option disabled value="">Escolha...</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
              {errors?.pcd?.type === "required" && (<p className='form-error'>Campo obrigatório</p>)}
            </div>

            <div>
              <label className="form-label">Vive no Brasil</label>
              <select {...register("viveBrasil", { required: true })}
                className="form-input"
                onInput={handleFormInput}>
                <option disabled value="">Escolha...</option>
                <option value="TRUE">Sim</option>
                <option value="FALSE">Não</option>
              </select>
              {errors?.viveBrasil?.type === "required" && (<p className='form-error'>Campo obrigatório</p>)}
            </div>

            {viveBrasilValue === 'TRUE' && (
              <div>
                <label className="form-label">Estado de Moradia</label>
                <select {...register("estadoMoradia", { required: true })}
                  className="form-input"
                  onInput={handleFormInput}>
                  <option disabled value="">Escolha...</option>
                  <option value="Acre (AC)">Acre (AC)</option>
                  <option value="Alagoas (AL)">Alagoas (AL)</option>
                  <option value="Amapá (AP)">Amapá (AP)</option>
                  <option value="Amazonas (AM)">Amazonas (AM)</option>
                  <option value="Bahia (BA)">Bahia (BA)</option>
                  <option value="Ceará (CE)">Ceará (CE)</option>
                  <option value="Distrito Federal (DF)">Distrito Federal (DF)</option>
                  <option value="Espírito Santo (ES)">Espírito Santo (ES)</option>
                  <option value="Goiás (GO)">Goiás (GO)</option>
                  <option value="Maranhão (MA)">Maranhão (MA)</option>
                  <option value="Mato Grosso (MT)">Mato Grosso (MT)</option>
                  <option value="Mato Grosso do Sul (MS)">Mato Grosso do Sul (MS)</option>
                  <option value="Minas Gerais (MG)">Minas Gerais (MG)</option>
                  <option value="Pará (PA)">Pará (PA)</option>
                  <option value="Paraíba (PB)">Paraíba (PB)</option>
                  <option value="Paraná (PR)">Paraná (PR)</option>
                  <option value="Pernambuco (PE)">Pernambuco (PE)</option>
                  <option value="Piauí (PI)">Piauí (PI)</option>
                  <option value="Rio de Janeiro (RJ)">Rio de Janeiro (RJ)</option>
                  <option value="Rio Grande do Norte (RN)">Rio Grande do Norte (RN)</option>
                  <option value="Rio Grande do Sul (RS)">Rio Grande do Sul (RS)</option>
                  <option value="Rondônia (RO)">Rondônia (RO)</option>
                  <option value="Roraima (RR)">Roraima (RR)</option>
                  <option value="Santa Catarina (SC)">Santa Catarina (SC)</option>
                  <option value="São Paulo (SP)">São Paulo (SP)</option>
                  <option value="Sergipe (SE)">Sergipe (SE)</option>
                  <option value="Tocantins (TO)">Tocantins (TO)</option>
                </select>
                {errors?.estadoMoradia?.type === "required" && (<p className='form-error'>Campo obrigatório</p>)}
              </div>
            )}
            <div>
              <label className="form-label">Nível de Ensino</label>
              <select name="nivel_ensino" {...register("nivelEnsino", { required: true })}
                className="form-input"
                onInput={handleFormInput}>
                <option disabled value="">Escolha...</option>
                <option value="Estudante de graduação">Estudante de graduação</option>
                <option value="Graduação/Bacharelado">Graduação/Bacharelado</option>
                <option value="Pós-graduação">Pós-graduação</option>
                <option value="Mestrado">Mestrado</option>
                <option value="Doutorado ou Phd">Doutorado ou PhD</option>
                <option value="Não tenho graduação formal">Não tenho graduação formal</option>
                <option value="Prefiro não informar">Prefiro não informar</option>
              </select>
              {errors?.nivelEnsino?.type === "required" && (<p className='form-error'>Campo obrigatório</p>)}
            </div>

            <div>
              <label className="form-label">Formação</label>
              <select className="form-input" {...register("formacao", { required: true })} onInput={handleFormInput}>
                <option disabled value="">Escolha...</option>
                <option value="Computação / Engenharia de Software / Sistemas de Informação/ TI">Computação / Engenharia de Software / Sistemas de Informação/ TI</option>
                <option value="Outras Engenharias">Outras Engenharias</option>
                <option value="Economia/ Administração / Contabilidade / Finanças/ Negócios">Economia/ Administração / Contabilidade / Finanças/ Negócios</option>
                <option value="Estatística/ Matemática / Matemática Computacional/ Ciências Atuariais">Estatística/ Matemática / Matemática Computacional/ Ciências Atuariais</option>
                <option value="Outra opção">Outra opção</option>
                <option value="Marketing / Publicidade / Comunicação / Jornalismo">Marketing / Publicidade / Comunicação / Jornalismo</option>
                <option value="Química / Física">Química / Física</option>
                <option value="Ciências Biológicas/ Farmácia/ Medicina/ Área da Saúde">Ciências Biológicas/ Farmácia/ Medicina/ Área da Saúde</option>
                <option value="Ciências Sociais">Ciências Sociais</option>
              </select>
              {errors?.formacao?.type === "required" && (<p className='form-error'>Campo obrigatório</p>)}<br />
            </div>

            <div>
              <label className="form-label">Tempo de Experiência com Dados (anos):</label>
              <select className="form-input" {...register("experienciaDados", { required: true })} onInput={handleFormInput}>
                <option disabled value="">Escolha...</option>
                <option value="Menos de 1 ano">Menos de 1 ano</option>
                <option value="de 1 a 2 anos">de 1 a 2 anos</option>
                <option value="de 3 a 4 anos">de 3 a 4 anos</option>
                <option value="de 4 a 6 anos">de 4 a 6 anos</option>
                <option value="de 7 a 10 anos">de 7 a 10 anos</option>
                <option value="Mais de 10 anos">Mais de 10 anos</option>
                <option value="Não tenho experiência na área de dados">Não tenho experiência na área de dados</option>
              </select>
              {errors?.experienciaDados?.type === "required" && (<p className='form-error'>Campo obrigatório</p>)}
            </div>

            <div>
              <label className="form-label" >Linguagem Preferida (ex: Python, R):</label>
              <select className="form-input" {...register("linguagensPreferidas", { required: true })} onInput={handleFormInput}>
                <option disabled value="">Escolha...</option>
                <option value="Python">Python</option>
                <option value="R">R</option>
                <option value="Scala">Scala</option>
                <option value="SQL">SQL</option>
                <option value="C/C++/C#">C/C++/C#</option>
                <option value="Julia">Julia</option>
                <option value="Javascript">Javascript</option>
              </select>
              {errors?.linguagensPreferidas?.type === "required" && (<p className='form-error'>Campo obrigatório</p>)}
            </div>

            <div>
              <label className="form-label">Bancos de Dados</label><input type="text"
                {...register("bancoDados", { required: true })}
                className="form-input"
                placeholder='Digite o nome do banco de dados aqui (Ex: MongoDb)'
                onInput={handleFormInput} />
              {errors?.bancoDados?.type === "required" && (<p className="form-error">Campo obrigatório.</p>)}
            </div>

            <div>
              <label className="form-label" > Cloud Preferida:</label>
              <select className="form-input" {...register("cloudPreferida", { required: true })} onInput={handleFormInput} >
                <option disabled value="">Escolha...</option>
                <option value="Amazon Web Services (AWS)">Amazon Web Services (AWS)</option>
                <option value="Azure (Microsoft)">Azure (Microsoft)</option>
                <option value="Google Cloud (GCP)">Google Cloud (GCP)</option>
                <option value="Outra Cloud">Outra Cloud</option>
                <option value="Não sei opinar">Não sei opinar</option>
              </select>
              {errors?.cloudPreferida?.type === "required" && (<p className='form-error'>Campo obrigatório</p>)}
            </div>

            <button type="submit" disabled={isLoading} className="form-button">
              {isLoading ? 'Analisando...' : 'Prever Cargo'}
            </button>
          </form>
        </div>

        <div className="robot-container-form">
          <RobotSVG
            expression={robotExpression}
            speak={robotMessage}
            color="#3b82f6"
            size={350}
            blink
          />
        </div>
      </main>
      <footer className="footer">
        <p>All Rights reserved to authors.</p>
      </footer>
    </div>
  );
}
