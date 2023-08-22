import { useState, useEffect } from "react";
import { db, auth } from "./firebaseConnection";
import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import './index.css'


function App() {

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idPost, setIdPost] = useState('');
  const [post, setPosts] = useState([])

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    async function consultarPosts() {
      const data = onSnapshot(collection(db, "post"), (snapshot) => {
        const listaPost = []
        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })
        })
        setPosts(listaPost)
      })
    }
    consultarPosts()
  }, []);

  async function adicionarPost() {
    await addDoc(collection(db, "post"), {
      titulo: titulo,
      autor: autor
    }).then(() => {
      setIdPost('')
      setTitulo('')
      setAutor('')
      console.log("Post adicionado com sucesso!")
    }).catch((error) => {
      console.log(error)
    })
  }

  async function buscarPost(id) {
    const postsReferencia = doc(db, "post", id)
    await getDoc(postsReferencia)
      .then((snapshot) => {
        let lista = []
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })
        })
        setPosts(lista)
        console.log('post encontrado')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function excluirPost(id) {
    const dados = doc(db, "post", id)
    await deleteDoc(dados)
      .then(() => {

        console.log("Post deletado com sucesso!")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function atualizarPost(id) {
    const dados = doc(db, "post", id)
    await updateDoc(dados, {
      titulo: titulo,
      autor: autor
    })
      .then(() => {
        setIdPost('')
        setTitulo('')
        setAutor('')
        console.log("Post atualizado com sucesso!")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <div className='flex w-full items-center justify-center '>
        <form className="w-8/12 flex flex-col justify-center my-10">
          <div className="flex items-center mb-6">
            <div className="w-2/12">
              <label className="block text-gray-700 font-bold text-center mb-1 pr-4" for="Titulo">
                Titulo
              </label>
            </div>
            <div className="w-2/3">
              <input onChange={e => setTitulo(e.target.value)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="titulo" type="text" placeholder='post 1' />
            </div>
          </div>
          <div className="flex items-center mb-6">
            <div className="w-2/12">
              <label className="block text-gray-700 font-bold text-center mb-1 pr-4" for="autor">
                Autor
              </label>
            </div>
            <div className="w-2/3">
              <input onChange={e => setAutor(e.target.value)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="autor" type="text" placeholder="Tiago" />
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-2/12"></div>
            <div className="w-2/3 gap-4 flex">
              <button onClick={adicionarPost} className="shadow bg-green-700 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                Adicionar
              </button>
              <button onClick={buscarPost()} className="shadow bg-green-700 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                Consultar
              </button>
              <button onClick={excluirPost} className="shadow bg-green-700 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                Excluir
              </button>
            </div>
          </div>
          {post.map((item) => {
          return (
            <div>
              <h1>{item.titulo}</h1>
              <h1>{item.autor}</h1>
            </div>
            )
        })}
        </form>
        
      </div>
    </>
  );
}

export default App;
