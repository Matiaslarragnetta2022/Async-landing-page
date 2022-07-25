const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCCWQ_UwBYZSHDUtkC1nTyXw&part=snippet%2Cid&order=date&maxResults=9';

//aqui agregaremos la iteracion de cada elemento(referencia)
const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
        'X-RapidAPI-Key': 'ab6d62f7b1msh851eefea36b3280p112f7cjsna07320613ec6',
		
	}
};

async function fetchData(urlApi){
    const response = await fetch(urlApi, options)
    const data = await response.json();
    return data; 
}

//funcion que se autoinvoca
//cuando cargue el archivo se va a ejecutar
(async ()=>{
    try{
        const videos = await fetchData(API);
        //crearemos un template en html para que itere por los elementos de la respuesta
        //view es esa porcion de html
        //usamos js para iterar 
        //en esta API , para acceder a los videos, se refiere a items, se hace un map para devolver un nuevo arreglo con el template por cada resultado
        let view = `
        ${videos.items.map(video=>`
            <div class="group relative">
            <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.snippet.title}
                </h3>
            </div>
            </div>
        
        `).slice(0,8).join('')}  
        `;
        //.slice)(0,4).join('')} sirve para iterar solo 4 videos.
        content.innerHTML = view;
    }catch{
        alert('fallo llamado a la api');
    }
})();
	