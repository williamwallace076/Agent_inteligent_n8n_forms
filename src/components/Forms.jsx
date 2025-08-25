import './Forms.css'
import axios from 'axios'
import { useForm } from "react-hook-form"
import { useState } from 'react'

const Forms = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [cargoPrevisto, setCargoPrevisto] = useState(null);

    const onSubmit = async (data) => {
        try {
            const payload = {
                idade: data.idade,
                genero: data.genero,
                etnia: data.etnia,
                pcd: data.pcd,
                vive_no_brasil: data.viveBrasil,
                estado_moradia: data.estadoMoradia,
                nivel_ensino: data.nivelEnsino,
                formacao: data.formacao,
                tempo_experiencia_dados: data.experienciaDados,
                linguagens_Preferidas: data.linguagensPreferidas,
                bancos_de_dados: data.bancoDados,
                cloud_preferida: data.cloudPreferida
            };

                const response = await axios.post(
                    'https://primary-production-3be4.up.railway.app/webhook-test/previsao', 
                    payload,
                    { headers: {"Content-Type": "application/json" } }
                );
                console.log("enviando :",  payload)
                console.log("resposta completa :", response.data);
            
                setCargoPrevisto(response.data.cargo) // cargo retornado pelo agente 
                console.log("O cargo previsto é : ", response.data.cargo)
            } catch (error) {
                console.error('Erro ao enviar os dados', error);
                alert('Erro ao prever o cargo. Verifique o console.')
            }
                
    
        };

        return (
            <>
                <section className='header-section'>

                    <div className='title-area'>
                        <h1 >Descubra qual cargo combina melhor com você !</h1>

                    </div>

                </section>

                <section className='main-section'>

                    <div className="form-area">
                        <form id="form-predicao">
                            <label>Idade:</label>
                            <input
                                className={errors?.idade && "input-error"}
                                type="number"
                                name="idade"
                                min="16"
                                max="90"
                                placeholder="Digite sua idade"
                                {...register("idade", { required: true, min: 16, max: 90 })}

                            />
                            {errors?.idade?.type === "required" && (<p className='error-message'>Campo obrigatório</p>) ||
                                errors?.idade?.type === "min" && (<p className='error-message'>A idade minima é 16 anos</p>) ||
                                errors?.idade?.type === "max" && (<p className='error-message'>A idade máxima é 90 anos</p>)
                            }
                            <br />

                            <label>Gênero:</label>
                            <select name="genero" {...register("genero", { required: true })}>
                                <option value="">Escolha</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                {/* <option value="Prefiro não informar">Prefiro não informar</option> */}
                            </select>
                            {errors?.genero?.type === "required" && (<p className='error-message'>Campo obrigatório</p>)}
                            <br />

                            <label>Etnia:</label>
                            <select name="etnia" {...register("etnia", { required: true })}>
                                <option value="">Escolha</option>
                                <option value="Branca">Branca</option>
                                <option value="Parda">Parda</option>
                                <option value="Preta">Preta</option>
                                <option value="Amarela">Amarela</option>
                                {/* <option value="Prefiro não informar">Prefiro não informar</option> */}
                                {/* <option value="Indígena">Indígena</option> */}
                                {/* <option value="Outra">Outra</option> */}
                            </select>
                            {errors?.etnia?.type === "required" && (<p className='error-message'>Campo obrigatório</p>)}
                            <br />

                            <label>PCD (Pessoa com Deficiência):</label>
                            <select name="pcd" {...register("pcd", { required: true })}>
                                <option value="">Escolha</option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            {errors?.pcd?.type === "required" && (<p className='error-message'>Campo obrigatório</p>)}
                            <br />

                            <label>Vive no Brasil:</label>
                            <select name="vive_no_brasil" {...register("viveBrasil", { required: true })}>
                                <option value="">Escolha</option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            {errors?.viveBrasil?.type === "required" && (<p className='error-message'>Campo obrigatório</p>)}
                            <br />

                            <label>Estado de Moradia:</label>
                            <select name="estado_moradia" {...register("estadoMoradia", { required: true })}>
                                <option value="">Escolha</option>
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
                            {errors?.estadoMoradia?.type === "required" && (<p className='error-message'>Campo obrigatório</p>)}
                            <br />

                            <label>Nível de Ensino:</label>
                            <select name="nivel_ensino" {...register("nivelEnsino", { required: true })}>   
                                <option value="">Escolha</option>
                                <option value="Estudante de graduação">Estudante de graduação</option>
                                <option value="Graduação/Bacharelado">Graduação/Bacharelado</option>
                                <option value="Pós-graduação">Pós-graduação</option>
                                <option value="Mestrado">Mestrado</option>
                                <option value="Doutorado ou Phd">Doutorado ou PhD</option>
                                <option value="Não tenho graduação formal">Não tenho graduação formal</option>
                                <option value="Prefiro não informar">Prefiro não informar</option>
                            </select>
                            {errors?.nivelEnsino?.type === "required" && (<p className='error-message'>Campo obrigatório</p>)}
                            <br />

                            <label>Formação:</label>
                            <select  name="formacao" {...register("formacao", { required: true })}>
                                <option value="">Escolha</option>
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
                            {errors?.formacao?.type === "required" && (<p className='error-message'>Campo obrigatório</p>)}<br />

                            <label>Tempo de Experiência com Dados (anos):</label>
                            <select name="tempo_experiencia_dados" {...register("experienciaDados", { required: true })}>
                                <option value="">Escolha</option>
                                <option value="Menos de 1 ano">Menos de 1 ano</option>
                                <option value="de 1 a 2 anos">de 1 a 2 anos</option>
                                <option value="de 3 a 4 anos">de 3 a 4 anos</option>
                                <option value="de 4 a 6 anos">de 4 a 6 anos</option>
                                <option value="de 7 a 10 anos">de 7 a 10 anos</option>
                                <option value="Mais de 10 anos">Mais de 10 anos</option>
                                <option value="Não tenho experiência na área de dados">Não tenho experiência na área de dados</option>
                            </select>
                            {errors?.experienciaDados?.type === "required" && (<p className='error-message'>Campo obrigatório</p>)}
                                {/* // errors?.experienciaDados?.type === "min" && (<p className='error-message'>o tempo de experiencia deve ser no mínimo 0</p>) ||
                                // errors?.experienciaDados?.type === "max" && (<p className='error-message'>Tempo de experiência fora da faixa esperada</p>) */}
                            
                            <br />

                            <label>Linguagens Preferidas (ex: Python, R):</label>
                            <select name="linguagens_preferidas" {...register("linguagensPreferidas", { required: true })}>
                                <option value="">Escolha</option>
                                <option value="Python">Python</option>
                                <option value="R">R</option>
                                <option value="Scala">Scala</option>
                                <option value="SQL">SQL</option>
                                <option value="C/C++/C#">C/C++/C#</option>
                                <option value="Julia">Julia</option>
                                <option value="Javascript">Javascript</option>
                            </select>
                            {errors?.linguagensPreferidas?.type === "required" && (<p className='error-message'>Campo obrigatório</p>)}
                            <br />

                            <label>Bancos de Dados (ex: MySQL, MongoDB):</label>
                            <input
                                className={errors?.bancoDados && "input-error"}
                                type="text"
                                name="bancos_de_dados"
                                {...register("bancoDados", { required: true })}
                            />
                            {errors?.bancoDados?.type === "required" && (<p className='error-message'>Campo obrigatório</p>)}
                            <br />

                            <label>Cloud Preferida:</label>
                            <select name="cloud_preferida" {...register("cloudPreferida", { required: true })}>
                                <option value="">Escolha</option>
                                <option value="Amazon Web Services (AWS)">Amazon Web Services (AWS)</option>
                                <option value="Azure (Microsoft)">Azure (Microsoft)</option>
                                <option value="Google Cloud (GCP)">Google Cloud (GCP)</option>
                                <option value="Outra Cloud">Outra Cloud</option>
                                <option value="Não sei opinar">Não sei opinar</option>
                            </select>
                            {errors?.cloudPreferida?.type === "required" && (<p className='error-message'>Campo obrigatório</p>)}
                            <br />

                            <button type="button" onClick={() => handleSubmit(onSubmit)()}>Enviar</button>
                        </form>

                        {cargoPrevisto && (
                            <div className="resultado">
                                <h3>Você tem uma grande vocação para atuar no cargo de : {cargoPrevisto} ! </h3>
                            </div>
                        )}
                    </div>

                </section>

                <section className='footer-section'>

                    <div className='rights-area'>
                        <p className="rights-reserved">All Rights reserved to authors.</p>
                    </div>
                </section>
            </>

        );


    }

    export default Forms;
