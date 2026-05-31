
        // Los mismos datos de recetas (Mantenemos los 30 platos)
        const recipes = [
            { id: 1, title: "Hotcakes con Arándanos", category: "Desayuno", portions: "2 personas", time: "20 min", img: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=500&q=80", ingredients: ["Harina de amor", "2 huevos", "Leche", "Arándanos frescos", "Miel de abeja"], instructions: "Mezcla con suavidad. Cocina hasta que salgan burbujitas y voltea con cuidado. ¡Sirve con una sonrisa!" },
            { id: 2, title: "Chilaquiles Verdes", category: "Desayuno", portions: "4 personas", time: "30 min", img: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=500&q=80", ingredients: ["Tortillas crujientes", "Salsa verde casera", "Crema espesa", "Quesito fresco", "Pollo"], instructions: "Fríe las tortillas, baña en salsa muy caliente. Decora con mucha crema y amor." },
            { id: 3, title: "Omelette de Espinacas", category: "Desayuno", portions: "1 persona", time: "15 min", img: "https://nutrium.com/p/yair/recipes/289138", ingredients: ["3 huevos felices", "Espinacas tiernas", "Queso panela", "Pizca de sal"], instructions: "Bate los huevos, añade las espinacas y el queso. Dobla como un sobrecito y disfruta." },
            { id: 4, title: "Avena con Frutas", category: "Desayuno", portions: "1 persona", time: "10 min", img: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=500&q=80", ingredients: ["Avena integral", "Leche de almendras", "Fresas", "Plátano", "Canela"], instructions: "Cocina a fuego lento hasta que esté cremosa. Decora con caritas de fruta." },
            { id: 5, title: "Huevos Benedictinos", category: "Desayuno", portions: "2 personas", time: "25 min", img: "https://images.unsplash.com/photo-1600326145359-3a44909d1a39?auto=format&fit=crop&w=500&q=80", ingredients: ["Huevos pochados", "Muffins", "Tocino", "Salsa Holandesa sedosa"], instructions: "El secreto está en el pochado suave. Coloca sobre el pan y baña con la salsa mágica." },
            { id: 6, title: "Pan Francés Clásico", category: "Desayuno", portions: "2 personas", time: "15 min", img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=500&q=80", ingredients: ["Brioche", "Vainilla", "Canela", "Huevo", "Frutos rojos"], instructions: "Remoja el pan, dora en mantequilla y espolvorea azúcar como si fuera nieve." },
            { id: 7, title: "Bowl de Acai", category: "Desayuno", portions: "1 persona", time: "10 min", img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=500&q=80", ingredients: ["Acai orgánico", "Granola", "Semillas", "Coco"], instructions: "Licúa el acai bien frío. Sirve y decora con tus ingredientes favoritos en líneas bonitas." },
            { id: 8, title: "Molletes Mexicanos", category: "Desayuno", portions: "2 personas", time: "15 min", img: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=500&q=80", ingredients: ["Bolillo", "Frijoles", "Queso Manchego", "Pico de gallo"], instructions: "Unta frijolitos, pon queso y espera a que el horno haga su magia gratinando." },

            // FUERTES
            { id: 9, title: "Pasta Carbonara", category: "Fuerte", portions: "2 personas", time: "25 min", img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80", ingredients: ["Pasta larga", "Guanciale", "Yemas", "Pecorino"], instructions: "La clave es la cremosidad del huevo. No uses crema, ¡el secreto es el agua de cocción!" },
            { id: 10, title: "Salmon a las Hierbas", category: "Fuerte", portions: "2 personas", time: "20 min", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=500&q=80", ingredients: ["Salmón rosado", "Romero", "Limón amarillo", "Espárragos"], instructions: "Sella la piel hasta que esté crujiente. El aroma del romero te encantará." },
            { id: 11, title: "Tacos de Rib Eye", category: "Fuerte", portions: "4 personas", time: "30 min", img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=500&q=80", ingredients: ["Rib Eye", "Tortillas calientitas", "Aguacate", "Salsa"], instructions: "Carne jugosa al punto. Sirve con mucho guacamole y cebollitas asadas." },
            { id: 12, title: "Lasaña de Res", category: "Fuerte", portions: "6 personas", time: "60 min", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80", ingredients: ["Pasta", "Res", "Bechamel", "Mozzarella"], instructions: "Capas y capas de sabor. Hornea hasta que el queso burbujee de alegría." },
            { id: 13, title: "Hamburguesa Gourmet", category: "Fuerte", portions: "1 persona", time: "20 min", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80", ingredients: ["Res", "Brioche", "Tocino", "Cebolla dulce"], instructions: "Arma tu hamburguesa con cuidado. ¡No olvides la salsa secreta de la casa!" },
            { id: 14, title: "Pollo al Curry", category: "Fuerte", portions: "3 personas", time: "40 min", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=500&q=80", ingredients: ["Pollo", "Coco", "Curry", "Arroz blanco"], instructions: "Una explosión de especias suaves. La leche de coco lo hace súper cremosito." },
            { id: 15, title: "Enchiladas Suizas", category: "Fuerte", portions: "3 personas", time: "35 min", img: "https://www.recetasnestle.com.mx/sites/default/files/srh_recipes/bf5c4725e0960701a77e94966aab5a6a.jpg", ingredients: ["Pollo", "Salsa verde", "Crema", "Queso"], instructions: "Baña las enchiladas generosamente. El horno les dará el toque dorado perfecto." },
            { id: 16, title: "Risotto de Hongos", category: "Fuerte", portions: "2 personas", time: "45 min", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=500&q=80", ingredients: ["Arroz", "Champiñones", "Caldo", "Vino", "Mantequilla"], instructions: "Mueve el arroz con paciencia. Cada vuelta es amor que se convierte en cremosidad." },

            // POSTRES
            { id: 17, title: "Cheesecake de Fresa", category: "Postre", portions: "8 personas", time: "50 min", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=500&q=80", ingredients: ["Queso crema", "Galleta", "Fresas dulces"], instructions: "Hornea a fuego bajo. Déjalo dormir en el refri toda la noche para que esté firme." },
            { id: 18, title: "Brownies con Nuez", category: "Postre", portions: "12 piezas", time: "40 min", img: "https://images.unsplash.com/photo-1461009312844-e80697a81cc7?auto=format&fit=crop&w=500&q=80", ingredients: ["Chocolate", "Nueces", "Azúcar", "Harina"], instructions: "No los hornees de más, el centro debe quedar como un abrazo de chocolate." },
            { id: 19, title: "Tiramisú", category: "Postre", portions: "6 personas", time: "30 min", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=80", ingredients: ["Soletas", "Café", "Mascarpone", "Cacao"], instructions: "Remoja rápido para que no se deshagan. Capas perfectas, sabor intenso." },
            { id: 20, title: "Mousse de Limón", category: "Postre", portions: "4 personas", time: "15 min", img: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=500&q=80", ingredients: ["Limón", "Leche condensada", "Crema"], instructions: "Batido rápido y refrescante. El postre ideal después de una comidita pesada." },
            { id: 21, title: "Churros", category: "Postre", portions: "4 personas", time: "30 min", img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=500&q=80", ingredients: ["Masa casera", "Azúcar", "Canela", "Chocolate"], instructions: "Fríe con cuidado hasta que estén doraditos. Pásalos por azúcar mientras están calientes." },
            { id: 22, title: "Creme Brulée", category: "Postre", portions: "2 personas", time: "40 min", img: "https://www.nestleprofessional.in/sites/default/files/2022-07/Vanilla-Creme-Brulee.jpg", ingredients: ["Nata", "Vainilla", "Yemas", "Azúcar"], instructions: "Romper la capa de cristal de azúcar es la mejor parte. ¡Usa un soplete con cuidado!" },
            { id: 23, title: "Pay de Manzana", category: "Postre", portions: "8 personas", time: "60 min", img: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=500&q=80", ingredients: ["Manzanas rojas", "Canela", "Pasta hojaldre"], instructions: "El aroma a canela llenará toda tu casa de felicidad mientras se hornea." },
            { id: 24, title: "Panna Cotta", category: "Postre", portions: "4 personas", time: "20 min", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80", ingredients: ["Crema", "Vainilla", "Frutos rojos"], instructions: "Tan suave que baila en el plato. Sírvela con una salsa ácida de frutos rojos." },

            // BEBIDAS
            { id: 25, title: "Ponche Navideño", category: "Bebida", portions: "10 personas", time: "45 min", img: "https://editorialtelevisa.brightspotcdn.com/dims4/default/308b8bd/2147483647/strip/true/crop/560x560+220+0/resize/1000x1000!/quality/90/?url=https%3A%2F%2Fk2-prod-editorial-televisa.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fwp-content%2Fuploads%2F2018%2F12%2Fponche-navideno.jpg", ingredients: ["Guayaba", "Manzana", "Canela", "Tejocote"], instructions: "Hierve todo junto hasta que la fruta esté suave y el agua sepa a Navidad." },
            { id: 26, title: "Smoothie Tropical", category: "Bebida", portions: "1 persona", time: "5 min", img: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=500&q=80", ingredients: ["Mango", "Piña", "Naranja"], instructions: "Licúa con mucho hielo. Es como beber un rayito de sol en un vaso." },
            { id: 27, title: "Latte de Vainilla", category: "Bebida", portions: "1 persona", time: "5 min", img: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&w=500&q=80", ingredients: ["Café", "Leche", "Vainilla"], instructions: "Espuma la leche hasta que parezca una nube. Agrega al café con cuidado." },
            { id: 28, title: "Margarita Clásica", category: "Bebida", portions: "1 persona", time: "5 min", img: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=500&q=80", ingredients: ["Tequila", "Limón", "Sal", "Hielo"], instructions: "Escarcha tu copa para que se vea bonita. Mezcla y sirve bien frío." },
            { id: 29, title: "Limonada Lavanda", category: "Bebida", portions: "4 personas", time: "10 min", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80", ingredients: ["Limones", "Lavanda", "Jarabe"], instructions: "El color lila es lo más tierno del mundo. Adorna con ramitas de lavanda real." },
            { id: 30, title: "Chocolate Caliente", category: "Bebida", portions: "2 personas", time: "10 min", img: "https://images.unsplash.com/photo-1544787210-2213d2427507?auto=format&fit=crop&w=500&q=80", ingredients: ["Chocolate", "Leche", "Bombones"], instructions: "Sirve con muchos bombones flotando. Es el mejor remedio para un día gris." }
        ];

        function renderRecipes(filter = 'Todas') {
            const grid = document.getElementById('recipesGrid');
            grid.innerHTML = '';
            
            const filtered = filter === 'Todas' ? recipes : recipes.filter(r => r.category === filter);
            
            filtered.forEach(recipe => {
                grid.innerHTML += `
                    <div class="recipe-card bg-white rounded-[2.5rem] overflow-hidden shadow-lg border-2 border-pink-50">
                        <div class="relative h-64 overflow-hidden">
                            <img src="${recipe.img}" alt="${recipe.title}" class="w-full h-full object-cover transition duration-700 hover:scale-110">
                            <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-[10px] font-bold text-pink-500 uppercase tracking-widest shadow-sm">
                                ✨ ${recipe.category}
                            </div>
                        </div>
                        <div class="p-8 text-center">
                            <h3 class="text-xl font-bold mb-4 text-gray-700 cute-title">${recipe.title}</h3>
                            <div class="flex justify-center items-center gap-6 text-xs text-pink-300 mb-8 font-bold uppercase tracking-tighter">
                                <span><i class="far fa-clock mr-1"></i> ${recipe.time}</span>
                                <span><i class="fas fa-cookie mr-1"></i> ${recipe.portions}</span>
                            </div>
                            <button onclick="openModal(${recipe.id})" class="w-full bg-pink-50 text-pink-500 font-bold py-4 rounded-3xl hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-pink-200">
                                Ver Recetita 🍰
                            </button>
                        </div>
                    </div>
                `;
            });
        }

        function filterRecipes(category) {
            const buttons = document.querySelectorAll('.category-pill');
            buttons.forEach(btn => {
                btn.classList.remove('active');
                if(btn.innerText.includes(category) || (category === 'Todas' && btn.innerText === 'Todas')) {
                    btn.classList.add('active');
                }
            });
            renderRecipes(category);
        }

        function openModal(id) {
            const recipe = recipes.find(r => r.id === id);
            const modal = document.getElementById('recipeModal');
            const content = document.getElementById('modalContent');
            
            content.innerHTML = `
                <div class="md:flex">
                    <div class="md:w-1/2 h-72 md:h-[600px]">
                        <img src="${recipe.img}" class="w-full h-full object-cover">
                    </div>
                    <div class="md:w-1/2 p-10 md:p-14 bg-white">
                        <span class="text-pink-400 font-bold uppercase text-[10px] tracking-[0.2em] mb-2 block">✨ ${recipe.category}</span>
                        <h2 class="text-4xl font-bold mb-6 cute-title text-gray-700 leading-tight">${recipe.title}</h2>
                        
                        <div class="flex gap-8 mb-10 py-6 border-y-2 border-pink-50">
                            <div><p class="text-[10px] text-pink-300 uppercase font-black mb-1">Tiempo</p><p class="font-bold text-gray-600">${recipe.time}</p></div>
                            <div><p class="text-[10px] text-pink-300 uppercase font-black mb-1">Porciones</p><p class="font-bold text-gray-600">${recipe.portions}</p></div>
                        </div>

                        <div class="mb-10">
                            <h4 class="font-bold text-lg mb-4 cute-title text-purple-400">✨ Ingredientes</h4>
                            <ul class="grid grid-cols-1 gap-3 text-sm text-gray-500 font-medium">
                                ${recipe.ingredients.map(ing => `<li class="flex items-center gap-3"><span class="w-2 h-2 bg-pink-200 rounded-full"></span> ${ing}</li>`).join('')}
                            </ul>
                        </div>

                        <div>
                            <h4 class="font-bold text-lg mb-4 cute-title text-yellow-500">🌸 Preparación</h4>
                            <p class="text-gray-500 text-sm leading-loose">${recipe.instructions}</p>
                        </div>
                        
                        <div class="mt-12 text-center">
                            <p class="text-pink-200 text-3xl"><i class="fas fa-heart"></i></p>
                        </div>
                    </div>
                </div>
            `;
            
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('recipeModal').classList.add('hidden');
            document.body.style.overflow = 'auto';
        }

        document.getElementById('recipeModal').addEventListener('click', (e) => {
            if(e.target === document.getElementById('recipeModal')) closeModal();
        });

        // Feedback
        let currentRating = 0;
        function setRating(val) {
            currentRating = val;
            const stars = document.querySelectorAll('.star-rating');
            stars.forEach((star, index) => {
                if(index < val) {
                    star.classList.remove('text-pink-100');
                    star.classList.add('text-yellow-400');
                    star.classList.add('scale-125');
                } else {
                    star.classList.add('text-pink-100');
                    star.classList.remove('text-yellow-400');
                    star.classList.remove('scale-125');
                }
            });
        }

        function submitFeedback() {
            if(currentRating === 0) return;
            const form = document.getElementById('satisfactionForm');
            form.innerHTML = `
                <div class="text-center py-16 animate-bounce">
                    <div class="text-pink-400 text-6xl mb-6">💖</div>
                    <h3 class="text-3xl font-bold cute-title text-pink-500">¡Recibido con amor!</h3>
                    <p class="text-gray-500 mt-4 font-medium">Tus estrellitas nos hacen muy felices.</p>
                </div>
            `;
        }

        window.onload = () => renderRecipes();

        document.getElementById('menuBtn').addEventListener('click', () => {
            const nav = document.querySelector('nav div.hidden');
            nav.classList.toggle('hidden');
            nav.classList.toggle('flex');
            nav.classList.toggle('flex-col');
            nav.classList.toggle('mt-4');
            nav.classList.toggle('items-center');
            nav.classList.toggle('space-y-4');
        });