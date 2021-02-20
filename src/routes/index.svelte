<script>
	export let date = null
	export let rates = []

	function getTimeSince(date) {
    const diff = Date.now() - new Date(date).getTime()

    var seconds = Math.floor(diff / 1000);

    var interval = seconds / 31536000;

    interval = seconds / 2592000;
    if (interval > 1) {
      return `publicado hace ${Math.floor(interval)} mes${interval < 2 ?  '' : 'es'}`;
    }

    interval = seconds / 86400;
    if (interval > 1) {
      return `publicado hace ${Math.floor(interval)} día${interval < 2 ?  '' : 's'}`;
    }

    interval = seconds / 3600;
    if (interval > 1) {
      return `publicado hace ${Math.floor(interval)} hora${interval < 2 ?  '' : 's'}`;
    }

    interval = seconds / 60;
    if (interval > 1) {
      return `publicado hace ${Math.floor(interval)} minuto${interval < 2 ?  '' : 's'}`;
    }

    return `publicado hace ${Math.floor(seconds)} segundo${interval < 2 ?  '' : 's'}`;
  }
</script>

<script context="module">
	export async function preload() {
		let response = await this.fetch('./data/homepage.json')
		const { date, rates } = await response.json()

		return {
			date,
			rates,
		}
	}
</script>

<style>
	h1 {
		margin-bottom: 20px;
		color: #313d69;
	}

	h2 {
		margin: 0;
	}

	.container {
		color: #313d69;
		font-size: 20px;
		padding: 15px 15px 0;
		margin: 0 10px;
	}
</style>

<svelte:head>
	<title>El tipo de cambio en Tijuana | Dolar - Pesos</title>
	<meta name="description" content="Listado del tipo de cambio para el dolar y pesos.">
	<link href="https://www.google-analytics.com" rel="dns-prefetch">
</svelte:head>


<h1>
	Tipo de cambio: Dolar - Pesos
</h1>

<div class="container">
	{#each rates as rate }
		<h2><a href={`//${rate.url}`} rel="nofollow noreferrer" target="blank">{rate.entity}</a></h2>
		<div>Compra: {rate.buy}</div>
		<div>Vende: {rate.sell}</div>
	{/each}
</div>

<div class="container">
	Última actualización: {getTimeSince(date)}
</div>
