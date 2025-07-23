import './Forms.css'

import { useForm } from "react-hook-form"

const Forms = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data, event) => { console.log(data); event.preventDefault(); };

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
                            className={errors?.idade && "input-error"}
                            type="number"
                            name="idade"
                            min = "16"
                            max="90"
                            placeholder="Digite sua idade"
                            {...register("idade", { required: true, min:16, max:90 })}

                        />
                        {errors?.idade?.type === "required" && (<p className='error-message'>Campo obrigatório</p>) ||
                        errors?.idade?.type==="min" && (<p className='error-message'>A idade minima é 16 anos</p>)  ||
                        errors?.idade?.type==="max" && (<p className='error-message'>A idade máxima é 90 anos</p>)
                        }
                        <br />

                        <label>Gênero:</label>
                        <select name="genero" {...register("genero", { required: true })}>
                            <option value="">Escolha</option>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                            <option value="outro">Outro</option>
                        </select>
                        {errors?.genero?.type === "required" && (<p className='error-message'>Campo obrigatório</p>)}
                        <br />

                        <label>Etnia:</label>
                        <input
                            className={errors?.etnia && "input-error"}
                            type="text"
                            name="etnia"
                            {...register("etnia", { required: true})}
                        />
                        {errors?.etnia?.type === "required" && (<p className='error-message'>Campo obrigatório</p>)}
                        <br />

                        <label>PCD (Pessoa com Deficiência):</label>
                        <select name="pcd" {...register("pcd", { required: true })}>
                            <option value="">Escolha</option>
                            <option value="sim">Sim</option>
                            <option value="nao">Não</option>
                        </select>
                        {errors?.pcd?.type === "required" && (<p className='error-message'>Campo obrigatório</p>)}
                        <br />

                        <label>Vive no Brasil:</label>
                        <select name="vive_no_brasil" {...register("viveBrasil", { required: true })}>
                            <option value="">Escolha</option>
                            <option value="sim">Sim</option>
                            <option value="nao">Não</option>
                        </select>
                        {errors?.viveBrasil?.type === "required" && (<p className='error-message'>Campo obrigatório</p>)}
                        <br />

                        <label>Estado de Moradia:</label>
                        <input
                            className={errors?.estadoMoradia && "input-error"}
                            type="text"
                            name="estado_moradia"
                            {...register("estadoMoradia", { required: true })}
                        />
                        {errors?.estadoMoradia?.type === "required" && (<p className='error-message'>Campo obrigatório</p>)}
                        <br />

                        <label>Nível de Ensino:</label>
                        <select name="nivel_ensino" {...register("nivelEnsino", { required: true })}>
                            <option value="">Escolha</option>
                            <option value="fundamental">Fundamental</option>
                            <option value="medio">Médio</option>
                            <option value="superior">Superior</option>
                            <option value="pos">Pós-graduação</option>
                        </select>
                        {errors?.nivelEnsino?.type === "required" && (<p className='error-message'>Campo obrigatório</p>)}
                        <br />

                        <label>Formação:</label>
                        <input
                            className={errors?.formacao && "input-error"}
                            type="text"
                            name="formacao"
                            {...register("formacao", { required: true })}
                        />
                        {errors?.formacao?.type === "required" && (<p className='error-message'>Campo obrigatório</p>)}<br />

                        <label>Tempo de Experiência com Dados (anos):</label>
                        <input
                            className={errors?.experienciaDados && "input-error"}
                            type="number"
                            name="tempo_experiencia_dados"
                            {...register("experienciaDados", { required: true })}
                        />
                        {errors?.experienciaDados?.type === "required" && (<p className='error-message'>Campo obrigatório</p>)}
                        <br />

                        <label>Linguagens Preferidas (ex: Python, R):</label>
                        <input
                            className={errors?.linguagensPreferidas && "input-error"}
                            type="text"
                            name="linguagens_preferidas"
                            {...register("linguagensPreferidas", { required: true })}
                        />
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
                            <option value="aws">AWS</option>
                            <option value="azure">Azure</option>
                            <option value="gcp">GCP</option>
                            <option value="nenhuma">Nenhuma</option>
                        </select>
                        {errors?.cloudPreferida?.type === "required" && (<p className='error-message'>Campo obrigatório</p>)}
                        <br />

                        <button type="" onClick={() => handleSubmit(onSubmit)()}>Enviar</button>
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