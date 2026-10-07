import { useState } from "react";

function App() {

  const [ideias, setIdeias] = useState([]);
  const [novaIdeia, setNovaIdeia] = useState("");
  const [erro, setErro] = useState("");

  function adicionarIdeia() {

    if (novaIdeia.trim() === "") {
      setErro("Digite sua ideia antes de adicionar.");
      return;
    }

    let ideia = {
      id: Date.now(),
      texto: novaIdeia,
      feita: false
    };

    setIdeias([...ideias, ideia]);
    setNovaIdeia("");
    setErro("");
  }

  function concluirIdeia(id) {

    let novasIdeias = ideias.map(function(ideia) {

      if (ideia.id === id) {
        return {
          ...ideia,
          feita: !ideia.feita
        };
      }

      return ideia;
    });

    setIdeias(novasIdeias);
  }

  function removerIdeia(id) {

    let novasIdeias = ideias.filter(function(ideia) {
      return ideia.id !== id;
    });

    setIdeias(novasIdeias);
  }

  let concluidas = ideias.filter(function(ideia) {
    return ideia.feita;
  }).length;

  return (
    <div className="container">

      <h1>Painel de Ideias</h1>

      <p>Digite uma ideia e adicione na lista.</p>

      <div className="formulario">

        <input
          type="text"
          placeholder="Digite sua ideia..."
          value={novaIdeia}
          onChange={function(event) {
            setNovaIdeia(event.target.value);
            setErro("");
          }}
        />

        <button onClick={adicionarIdeia}>
          Adicionar
        </button>

      </div>

      {erro && <p className="erro">{erro}</p>}

      <div className="lista">

        {ideias.map(function(ideia) {

          return (
            <div className="ideia" key={ideia.id}>

              <input
                type="checkbox"
                checked={ideia.feita}
                onChange={function() {
                  concluirIdeia(ideia.id);
                }}
              />

              <span className={ideia.feita ? "feita" : ""}>
                {ideia.texto}
              </span>

              <button
                onClick={function() {
                  removerIdeia(ideia.id);
                }}
              >
                Remover
              </button>

            </div>
          );

        })}

      </div>

      <p className="contador">
        Total de ideias: {ideias.length} | Concluídas: {concluidas}
      </p>

    </div>
  );
}

export default App;