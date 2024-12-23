class MyPreloader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = 
        `
        <div class="preloader">
            <div class="loader">
                <div class="loader-outter"></div>
                <div class="loader-inner"></div>

                <div class="indicator"> 
					<img src="img/favicon.png">
                </div>
            </div>
        </div>
    `
    }
}

customElements.define('preloader', MyPreloader)