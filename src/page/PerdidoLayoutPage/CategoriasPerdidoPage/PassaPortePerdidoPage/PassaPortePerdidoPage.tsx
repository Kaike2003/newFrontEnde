import React from 'react'
import Header from '../../../../components/layout/Header/Header'
import "../../../../css/style.css"
import { useStoreCategoria } from '../../../../store/StoreCategoria/StoreCategoria'
import PassaPortePerdido from '../../../../components/layout/PerdidoLayout/PerdidoCategorias/PassaPortePerdido/PassaPortePerdido'
import { useStoreData } from '../../../../store/StoreData/StoreData'
import { useStorePesquisar } from '../../../../store/StorePesquisar/StorePesquisar'
import { useStorePassaPorte } from '../../../../store/StorePassaPorte/StorePesquisarPassaPorte'
import { api } from '../../../../services/api/getToken'
import PassaPortePerdidoPesquisado from '../../../../components/layout/PerdidoLayout/PerdidoCategorias/PassaPortePerdido/PassaPortePerdidoPesquisado'


function PassaPortePerdidoPage() {

  const [categoria, setCategoria] = useStoreCategoria((state) => [state.categoria, state.setCategoria])

  const [pesquisarPassaPortePerdido, setPesquisarPassaPortePerdido] = useStorePassaPorte((state) => [state.pesquisarPassaPortePerdido, state.setPesquisarPassaPortePerdido])

  const [pesquisar, setPesquisar] = useStorePesquisar((state => [state.pesquisar, state.setPesquisar]))

  const [setData] = useStoreData((state) => [state.setData])

  async function fecth() {

    if (categoria === true) {
      setCategoria(false)
    } else {
      setCategoria(true)
    }

  }

  return (
    <div>
      <div>
        <Header />
      </div>

      <div className='flex justify-between place-items-center mx-5 mt-2'>
        <div className='flex gap-4'>
          <div
            className="inline-flex items-center px-8 py-3 text-white transition bg-gray-900 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-yellow-400 hover:bg-gray-800 cursor-pointer"
            onClick={fecth}
          >
            <span className="text-sm font-medium"> Achado </span>
          </div>
          {pesquisarPassaPortePerdido === true ?

            <div
              className="inline-flex items-center px-8 py-3 text-white transition bg-red-600 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-yellow-400 hover:bg-red-700 cursor-pointer"
              onClick={() => {
                setPesquisarPassaPortePerdido(false)
                setPesquisar("")
              }}
            >
              <span className="text-sm font-medium"> Cancelar pesquisa </span>

            </div>
            :
            <React.Fragment />
          }
        </div>
        <input id="email" type="text" className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Pesquisar"
          value={pesquisar}
          onChange={(e) => {
            setPesquisar(e.target.value)
          }}
          onKeyDown={async (e) => {
            if (e.code === "Enter") {
              if (pesquisarPassaPortePerdido === false) {
                if (pesquisar.length >= 3) {

                  const response = await api.post("/publico/listar_todos_pesquisado", {
                    pesquisar: pesquisar,
                    tipo_documento: "PASSAPORTE",
                    achado: false,
                    perdido: true
                  })

                  setData(response.data)

                }


                setPesquisarPassaPortePerdido(true)
                setPesquisar("")
              } else {

                if (pesquisar.length >= 3) {

                  const response = await api.post("/publico/listar_todos_pesquisado", {
                    pesquisar: pesquisar,
                    tipo_documento: "PASSAPORTE",
                    achado: false,
                    perdido: true
                  })

                  setData(response.data)

                }

                setPesquisar("")
                setPesquisarPassaPortePerdido(true)
              }
            }
          }}
        />
      </div>


      <div className='page'>

        <div className='divScroll'>

          {pesquisarPassaPortePerdido === true ?
            <PassaPortePerdidoPesquisado />
            :

            <PassaPortePerdido />
          }


        </div>
      </div>
    </div>
  )
}

export default PassaPortePerdidoPage