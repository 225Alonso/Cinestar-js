const getCine = async () => {
	const idx = new URLSearchParams(window.location.search).get("id")
	const data = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${idx}`)
	const tarifa = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${idx}/tarifas`)
	const pelicula = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${idx}/peliculas`)
	if (data.status == 200) {
		const cine = await data.json()
		const tarifas = await tarifa.json()
		const pelicu = await pelicula.json()
		let html = `
			<h2>${cine.RazonSocial}</h2>
			<div class="cine-info">
				<div class="cine-info datos">
					<p>${cine.Direccion} - ${cine.Detalle}</p>
					<p>Teléfono: 714-1865 anexo 865</p>
					<br/>
		`
		tarifas.forEach((tari,index) => {
			let color = index % 2 == 0 ? "" : " impar";
			html += `
						<div class="tabla">						
							<div class="fila${color}">
								<div class="celda-titulo">${tari.DiasSemana}</div>
								<div class="celda">${tari.Precio}</div>
							</div>
						</div>		
					`
		})
		html += `
			<div class="aviso">
				<p>A partir del 1ro de julio de 2016, Cinestar Multicines realizará el cobro de la comisión de S/. 1.00 adicional al tarifario vigente, a los usuarios que compren sus entradas por el aplicativo de Cine Papaya para Cine Star Comas, Excelsior, Las Américas, Benavides, Breña, San Juan, UNI, Aviación, Sur, Porteño, Tumbes y Tacna.</p>
			</div>
		</div>
			<img src="img/cine/${cine.id}.2.jpg"/>
				<br/><br/><h4>Los horarios de cada función están sujetos a cambios sin previo aviso.</h4><br/>
				<div class="cine-info peliculas">
				<div class="tabla">
					<div class="fila">
						<div class="celda-cabecera">Películas</div>
						<div class="celda-cabecera">Horarios</div>
					</div>
		`
		pelicu.forEach((peli,index) => {
			let color2 = index % 2 == 0 ? "" : " impar";
			html += `
				<div class="fila${color2}">
					<div class="celda-titulo">${peli.Titulo}</div>
					<div class="celda">${peli.Horarios}</div>
				</div>				
			`
		})
		html += `
		</div>
		</div>
		</div>
		<div>
			<img style="float:left;" src="img/cine/${cine.id}.3.jpg" alt="Imagen del cine"/>
			<span class="tx_gris">Precios de los juegos: desde S/1.00 en todos los Cine Star.<br/>
				Horario de atención de juegos es de 12:00 m hasta las 10:30 pm. 
				<br/><br/>
				Visitános y diviértete con nosotros. 
				<br/><br/>
				<b>CINESTAR</b>, siempre pensando en tí. 
			</span>		
		</div>
		`
		document.getElementById(`contenido-interno`).innerHTML = html

	}
}
getCine()

