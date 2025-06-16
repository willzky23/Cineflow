// cineflow.test.js

/**
 * @jest-environment jsdom
 */

// As funções do seu HTML original são replicadas aqui para fins de teste.
// Em um projeto real, você as importaria de um arquivo JavaScript separado.
const API_KEY = 'cf6ec6ffbab96b9197ffb9188ffaa4c2';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p';

// Mock do construtor Swiper para que os testes não tentem instanciar um Swiper real
const mockSwiperInstance = {
    destroy: jest.fn(), // Simula o método destroy do Swiper
};
const Swiper = jest.fn(() => mockSwiperInstance); // Mock do construtor Swiper

// Define as funções que serão testadas (normalmente estariam em um arquivo JS separado)
async function fetchPopularMovies() {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`);
        const data = await response.json();

        const featuredMovie = data.results[0];
        updateHeroBanner(featuredMovie);

        updateMovieCarousel(data.results);

        initializeSwiper();
        return data; // Retorna dados para fins de teste
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

function updateHeroBanner(movie) {
    const heroBanner = document.getElementById('heroBanner');
    if (heroBanner) { // Verifica se o elemento existe antes de manipulá-lo
        heroBanner.innerHTML = `
            <div class="absolute inset-0 bg-cover bg-center"
                 style="background-image: url('${IMG_URL}/original${movie.backdrop_path}')">
                <div class="absolute inset-0 bg-gradient-to-r from-[#121212]/90 via-[#121212]/60 to-transparent"></div>
            </div>
            <div class="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
                <div class="max-w-2xl mt-20">
                    <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-[#E0E0E0] mb-4">${movie.title}</h1>
                    <p class="text-lg text-[#9E9E9E] mb-8 line-clamp-3">${movie.overview}</p>
                    <div class="flex space-x-4">
                        <a href="https://www.youtube.com/watch?v=oLnS1Ij9-Kk">
                        <button class="bg-[#0466C8] hover:bg-[#0466C8]/90 text-[#E0E0E0] font-medium px-6 py-3 rounded-lg transition-colors flex items-center">
                            Assistir Trailer
                        </button>
                        </a>
                        <a href="populares.html">
                        <button class="bg-[#1E1E1E]/80 hover:bg-[#1E1E1E] text-[#E0E0E0] font-medium px-6 py-3 rounded-lg transition-colors">
                            Ver mais
                        </button>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}

function updateMovieCarousel(movies) {
    const movieCarousel = document.getElementById('movieCarousel');
    if (movieCarousel) { // Verifica se o elemento existe antes de manipulá-lo
        movieCarousel.innerHTML = movies.map(movie => `
            <div class="swiper-slide" style="width: 250px;">
                <a href="filmeindividual.html?id=${movie.id}" class="block">
                    <div class="bg-[#1E1E1E] rounded-lg overflow-hidden shadow-lg hover:ring-2 ring-[#0466C8] transition">
                        <div class="aspect-[2/3] relative">
                            <img
                                src="${IMG_URL}/w500${movie.poster_path}"
                                alt="${movie.title}"
                                class="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div class="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div class="p-4">
                            <h3 class="text-[#E0E0E0] font-semibold text-lg line-clamp-2 mb-2">${movie.title}</h3>
                            <div class="flex items-center text-[#9E9E9E] text-sm">
                                <span>${new Date(movie.release_date).getFullYear()}</span>
                                <span class="mx-2">•</span>
                                <div class="flex items-center">
                                    <span class="text-[#0466C8]">★</span>
                                    <span class="ml-1">${movie.vote_average.toFixed(1)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        `).join('');
    }
}

let swiper; // Variável global como no código original

function initializeSwiper() {
    if (swiper) {
        swiper.destroy(); // Se já existe uma instância, destrói-a
    }

    // eslint-disable-next-line no-undef
    swiper = new Swiper('.popularMovies', { // Usa o mock global Swiper
        slidesPerView: 'auto',
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 15
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 20
            }
        }
    });
}


describe('Testes Unitários Cineflow', () => {
    // Dados de exemplo para mocking
    const mockMovie = {
        id: 1,
        title: 'Filme Teste',
        overview: 'Este é um filme de teste para ver a descrição.',
        backdrop_path: '/backdrop.jpg',
        poster_path: '/poster.jpg',
        release_date: '2023-01-01',
        vote_average: 7.5
    };

    const mockMovies = [
        mockMovie,
        {
            id: 2,
            title: 'Filme Teste 2',
            overview: 'Outro filme para testar.',
            backdrop_path: '/backdrop2.jpg',
            poster_path: '/poster2.jpg',
            release_date: '2022-05-15',
            vote_average: 8.0
        }
    ];

    beforeEach(() => {
        // Reseta o DOM antes de cada teste
        document.body.innerHTML = `
            <div id="heroBanner"></div>
            <div class="swiper popularMovies">
                <div class="swiper-wrapper" id="movieCarousel"></div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
        `;
        // Limpa todos os mocks antes de cada teste
        jest.clearAllMocks();
        // Remock Swiper para cada teste para garantir um estado limpo
        global.Swiper = jest.fn(() => mockSwiperInstance);
        mockSwiperInstance.destroy.mockClear(); // Limpa o mock do método destroy
    });


    describe('updateHeroBanner', () => {
        test('deve atualizar o banner hero corretamente com os dados do filme', () => {
            updateHeroBanner(mockMovie);
            const heroBanner = document.getElementById('heroBanner');
            expect(heroBanner.innerHTML).toContain('Filme Teste');
            expect(heroBanner.innerHTML).toContain('Este é um filme de teste');
            expect(heroBanner.innerHTML).toContain(IMG_URL + '/original/backdrop.jpg');
        });
    });

    describe('updateMovieCarousel', () => {
        test('deve preencher o carrossel de filmes com os dados corretos', () => {
            updateMovieCarousel(mockMovies);
            const movieCarousel = document.getElementById('movieCarousel');
            expect(movieCarousel.children.length).toBe(mockMovies.length);
            expect(movieCarousel.innerHTML).toContain('Filme Teste');
            expect(movieCarousel.innerHTML).toContain('Filme Teste 2');
            expect(movieCarousel.innerHTML).toContain(IMG_URL + '/w500/poster.jpg');
            expect(movieCarousel.innerHTML).toContain('2023');
            expect(movieCarousel.innerHTML).toContain('7.5');
        });

        test('deve lidar graciosamente com um array de filmes vazio', () => {
            updateMovieCarousel([]);
            const movieCarousel = document.getElementById('movieCarousel');
            expect(movieCarousel.innerHTML).toBe('');
        });
    });

    describe('initializeSwiper', () => {
        test('deve inicializar o Swiper com os parâmetros corretos', () => {
            initializeSwiper();
            expect(global.Swiper).toHaveBeenCalledTimes(1);
            expect(global.Swiper).toHaveBeenCalledWith('.popularMovies', expect.any(Object));
            const swiperConfig = global.Swiper.mock.calls[0][1];
            expect(swiperConfig.slidesPerView).toBe('auto');
            expect(swiperConfig.spaceBetween).toBe(20);
            expect(swiperConfig.navigation).toEqual({
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            });
            expect(swiperConfig.pagination).toEqual({
                el: '.swiper-pagination',
                clickable: true,
            });
            expect(swiperConfig.breakpoints['320'].slidesPerView).toBe(1);
            expect(swiperConfig.breakpoints['1024'].slidesPerView).toBe(4);
        });

        test('deve destruir a instância existente do swiper antes de reinicializar', () => {
            // Primeira inicialização
            initializeSwiper();
            // Chama novamente para reinicializar
            initializeSwiper();
            expect(mockSwiperInstance.destroy).toHaveBeenCalledTimes(1);
            expect(global.Swiper).toHaveBeenCalledTimes(2); // Chamado duas vezes
        });
    });

    describe('fetchPopularMovies', () => {
        let fetchSpy;
        let updateHeroBannerSpy;
        let updateMovieCarouselSpy;
        let initializeSwiperSpy;

        beforeEach(() => {
            fetchSpy = jest.spyOn(global, 'fetch');
            // Espiona as funções que são chamadas dentro de fetchPopularMovies
            updateHeroBannerSpy = jest.spyOn(global, 'updateHeroBanner');
            updateMovieCarouselSpy = jest.spyOn(global, 'updateMovieCarousel');
            initializeSwiperSpy = jest.spyOn(global, 'initializeSwiper');
        });

        afterEach(() => {
            // Restaura as funções espiadas após cada teste
            fetchSpy.mockRestore();
            updateHeroBannerSpy.mockRestore();
            updateMovieCarouselSpy.mockRestore();
            initializeSwiperSpy.mockRestore();
        });

        test('deve buscar dados, atualizar banner e carrossel e inicializar o swiper', async () => {
            fetchSpy.mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ results: mockMovies }),
                })
            );

            await fetchPopularMovies();

            expect(fetchSpy).toHaveBeenCalledWith(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`);
            expect(updateHeroBannerSpy).toHaveBeenCalledWith(mockMovies[0]);
            expect(updateMovieCarouselSpy).toHaveBeenCalledWith(mockMovies);
            expect(initializeSwiperSpy).toHaveBeenCalledTimes(1);
        });

        test('deve lidar com erros da API', async () => {
            fetchSpy.mockImplementationOnce(() => Promise.reject(new Error('Erro de rede')));

            await expect(fetchPopularMovies()).rejects.toThrow('Erro de rede');
            expect(updateHeroBannerSpy).not.toHaveBeenCalled();
            expect(updateMovieCarouselSpy).not.toHaveBeenCalled();
            expect(initializeSwiperSpy).not.toHaveBeenCalled();
        });
    });
});