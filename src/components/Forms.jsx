import './Forms.css'

import {useForm} from "react-hook-form"

const Forms = () => {

    const {register, handleSubmit} = useForm()

    const onSubmit = (data,event) => {console.log(data); event.preventDefault(); };

    return (
        <>
            <section className='header-section'>

                <div className='title-area'>
                    <h1 >Formulário Para Agente Inteligente</h1>

                </div>

            </section>

            <section className='main-section'>

                <div className="form-area">
                        <form id="form-predicao">
                            <label>Idade:</label>
                            <input 
                            type="number" 
                            name="idade" 
                            min="16" max="90"
                            required 
                            {...register("idade")}
                            
                            /><br />

                            <label>Gênero:</label>
                            <select name="genero" {...register("genero")}>
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                                <option value="outro">Outro</option>
                            </select><br />

                            <label>Etnia:</label>
                            <input 
                            type="text" 
                            name="etnia"
                            {...register("etnia")}
                             /><br />

                            <label>PCD (Pessoa com Deficiência):</label>
                            <select name="pcd" {...register("pcd")}>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select><br />

                            <label>Vive no Brasil:</label>
                            <select name="vive_no_brasil" {...register("viveBrasil")}>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select><br />

                            <label>Estado de Moradia:</label>
                            <input 
                            type="text" 
                            name="estado_moradia" 
                            {...register("estadoMoradia")}
                            /><br />

                            <label>Nível de Ensino:</label>
                            <select name="nivel_ensino" {...register("nivelEnsino")}>
                                <option value="fundamental">Fundamental</option>
                                <option value="medio">Médio</option>
                                <option value="superior">Superior</option>
                                <option value="pos">Pós-graduação</option>
                            </select><br />

                            <label>Formação:</label>
                            <input 
                            type="text" 
                            name="formacao"
                            {...register("formacao")}
                            /><br />

                            <label>Tempo de Experiência com Dados (anos):</label>
                            <input 
                            type="number" 
                            name="tempo_experiencia_dados"
                            {...register("experienciaDados")}
                            /><br />

                            <label>Linguagens Preferidas (ex: Python, R):</label>
                            <input 
                            type="text" 
                            name="linguagens_preferidas"
                            {...register("linguagensPreferidas")}
                             /><br />

                            <label>Bancos de Dados (ex: MySQL, MongoDB):</label>
                            <input 
                            type="text" 
                            name="bancos_de_dados"
                            {...register("bancoDados")}
                             /><br />

                            <label>Cloud Preferida:</label>
                            <select name="cloud_preferida" {...register("cloudPreferida")}>
                                <option value="aws">AWS</option>
                                <option value="azure">Azure</option>
                                <option value="gcp">GCP</option>
                                <option value="nenhuma">Nenhuma</option>
                            </select><br />

                            <button type="" onClick={()=> handleSubmit(onSubmit)()}>Enviar</button>
                        </form>
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