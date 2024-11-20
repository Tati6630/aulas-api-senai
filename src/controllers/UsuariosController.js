import ConexaoMySql from "../database/ConexaoMySql.js";

class UsuariosController {
    async adicionar(req, resp) {
        try{
        const novoUsuario = req.body;

        if(!novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha){
            resp.status(400).send("Os campos nome, email e senha são obrigatórios.");
            return;
        }

        const conexao = await new ConexaoMySql().getConexao();
        const comandoSql = 
            "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, md5(?))";

        const [resultado] = await conexao.execute(comandoSql, [
                novoUsuario.nome, 
                novoUsuario.email, 
                novoUsuario.senha,
            ])

            resp.send("Tudo OK!");
        }catch (erro){
        resp.status(500)
    }
    }

}

export default UsuariosController;