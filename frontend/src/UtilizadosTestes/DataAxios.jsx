import React, { useEffect, useState } from 'react';
// Consumo de api utilizando fetch

const DataFetch = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const url = "http://localhost:3333/users/listarUsers";
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status ${response.status}`);
                }
                const json = await response.json(); // <- primeiro pega o JSON
                setUsuarios(json); // <- depois atualiza o estado
                console.log(json);
            } catch (error) {
                console.error("Erro ao buscar dados: ", error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h1>salve</h1>
            {usuarios.map((usuario) => (
                <p key={usuario.id}>{usuario.name}</p>
            ))}
        </>
    );
};

export default DataFetch;
