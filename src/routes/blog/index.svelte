<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script>

<script>
	export let posts;
	import sidebar from  './../../components/sidebar.svelte'
</script>

<style lang="scss">
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
	@import '../../assets/scss/base/common';
</style>

<svelte:head>
	<title>Blog</title>
</svelte:head>
<div class="container">

<sidebar></sidebar>
<div class="row pt-5">
	<div class="col-md-4 col-sm-12">
		<aside class="sidebar bg-white p-3">
			<h4>Categories</h4>
			<ul class="list-style-none">
				<li><a href="#">automobiles</a></li>
				<li><a href="#">Computer</a></li>
				<li><a href="#">Electronics</a></li>
				<li><a href="#">Mobile & accessories</a></li>
				<li><a href="#">Real Estate</a></li>
			</ul>
		</aside>
	</div>
	<div class="col-md-8 col-sm-12">
		<h4 class="title-4 title-bold bg_border bg_border--grey">Listing Page</h4>
		<div class="border">
			<ul class="list-style-none list-border">
				<li>
					<div class="media">
						<figure class="img-wrap img-wrap-150 mr-3 mb-0">
							<img src="../assets/img/jackets.jpg" alt="Jackets" class="block-absolute">
						</figure>
						<div class="media-body p-3">
							<h5 class="mt-0 title-5 title-bold">Jackets</h5>
							<p class="title-sm">Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one os</p>
							<button class="btn btn-success btn-sm">See Details</button>
						</div>
					</div>

				</li>
				<li>
					<div class="media">
						<figure class="img-wrap img-wrap-150 mr-3 mb-0">
							<img src="../assets/img/iphone.jpg" alt="iPhone X" class="block-absolute">
						</figure>
						<div class="media-body p-3">
							<h5 class="mt-0 title-5 title-bold">iPhone X</h5>
							<p class="title-sm">Random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
							<button class="btn btn-success btn-sm">See Details</button>
						</div>
					</div>
				</li>
				<li>
					<div class="media">
						<figure class="img-wrap img-wrap-150 mr-3 mb-0">
							<img src="../assets/img/jackets.jpg" alt="Jackets" class="block-absolute">
						</figure>
						<div class="media-body p-3">
							<h5 class="mt-0 title-5 title-bold">Jackets</h5>
							<p class="title-sm">It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one os</p>
							<button class="btn btn-success btn-sm">See Details</button>
						</div>
					</div>

				</li>
				<li>
					<div class="media">
						<figure class="img-wrap img-wrap-150 mr-3 mb-0">
							<img src="../assets/img/iphone.jpg" alt="iPhone X" class="block-absolute">
						</figure>
						<div class="media-body p-3">
							<h5 class="mt-0 title-5 title-bold">iPhone X</h5>
							<p class="title-sm">Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one os</p>
							<button class="btn btn-success btn-sm">See Details</button>
						</div>
					</div>
				</li>
			</ul>
			<div class="text-center">
				<!-- <button class="btn btn-success">Load More</button> -->
				<nav aria-label="..." class="d-inline-block">
					<ul class="pagination">
						<li class="page-item disabled">
						<a class="page-link" href="#" tabindex="-1">Previous</a>
						</li>
						<li class="page-item"><a class="page-link" href="#">1</a></li>
						<li class="page-item active">
						<a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
						</li>
						<li class="page-item"><a class="page-link" href="#">3</a></li>
						<li class="page-item">
						<a class="page-link" href="#">Next</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>

	</div>
</div>

</div>

<!-- <ul> -->
	<!-- {#each posts as post} -->
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<!-- <li><a rel='prefetch' href='blog/{post.slug}'>{post.title}</a></li> -->
	<!-- {/each} -->
<!-- </ul> -->