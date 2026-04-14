/* ============================================
   Agency OS — Mock Data
   Datos simulados coherentes y realistas
   ============================================ */

const TEAM_MEMBERS = [
    { id:'luis', name:'Luis Rodríguez', role:'Director de Estrategia', email:'luis@agencyos.com', avatar:'LR', color:'bg-indigo-600' },
    { id:'ana', name:'Ana Martínez', role:'Content Manager', email:'ana@agencyos.com', avatar:'AM', color:'bg-pink-600' },
    { id:'diego', name:'Diego Torres', role:'Traffic Manager', email:'diego@agencyos.com', avatar:'DT', color:'bg-cyan-600' },
    { id:'sofia', name:'Sofía Herrera', role:'Diseñadora Senior', email:'sofia@agencyos.com', avatar:'SH', color:'bg-amber-600' },
    { id:'carlos', name:'Carlos Vega', role:'Copywriter', email:'carlos@agencyos.com', avatar:'CV', color:'bg-emerald-600' },
    { id:'valentina', name:'Valentina Ruiz', role:'Community Manager', email:'valentina@agencyos.com', avatar:'VR', color:'bg-rose-600' },
    { id:'miguel', name:'Miguel Ángel Castro', role:'Audiovisual', email:'miguel@agencyos.com', avatar:'MC', color:'bg-violet-600' },
    { id:'daniela', name:'Daniela Flores', role:'Ejecutiva de Cuentas', email:'daniela@agencyos.com', avatar:'DF', color:'bg-teal-600' }
];

const AI_AGENTS = [
    { id:'research', name:'Research Assistant', desc:'Analiza competencia, tendencias de mercado y oportunidades de posicionamiento.', icon:'search', status:'Disponible', lastRun:'Hace 2 horas', execCount:47, tasks:['Benchmark PG Proyectos','Análisis tendencias inmobiliarias','Estudio audiencia Cayen'] },
    { id:'strategy', name:'Strategy Assistant', desc:'Propone pilares de contenido, distribución de presupuesto y embudos de conversión.', icon:'lightbulb', status:'Disponible', lastRun:'Hace 1 día', execCount:23, tasks:['Plan Q2 PG Proyectos','Redistribución budget Cayen','Embudo leads R-Vision'] },
    { id:'content', name:'Content Manager IA', desc:'Genera guiones técnicos, pautas visuales, calendarios editoriales y estructuras de video.', icon:'video', status:'Ejecutando...', lastRun:'Ahora', execCount:156, tasks:['Guion Reel inspección','Calendario Abril Cayen','Pauta visual ADN Creativo'] },
    { id:'copy', name:'Copywriter Assistant', desc:'Redacta copies persuasivos, hooks, CTAs y variantes adaptadas al tono de cada marca.', icon:'pen-tool', status:'Disponible', lastRun:'Hace 30 min', execCount:234, tasks:['Copies campaña Los Olivos','Hooks TikTok Pierre','CTAs landing R-Vision'] },
    { id:'community', name:'Community Assistant', desc:'Clasifica mensajes entrantes, sugiere respuestas y detecta oportunidades de engagement.', icon:'message-circle', status:'Disponible', lastRun:'Hace 15 min', execCount:89, tasks:['Bandeja PG Proyectos','Respuestas Cayen','Moderación ADN'] },
    { id:'reports', name:'Reporting Assistant', desc:'Analiza métricas, genera insights ejecutivos y arma reportes presentables al cliente.', icon:'bar-chart-2', status:'Disponible', lastRun:'Hace 3 horas', execCount:31, tasks:['Reporte Marzo Cayen','KPIs PG Proyectos','Análisis ROI ADN'] }
];

const AppData = {
    team: TEAM_MEMBERS,
    agents: AI_AGENTS,
    clients: [
        // ========== 1. PG PROYECTOS ==========
        {
            id:'pg-proyectos', name:'PG Proyectos', industry:'Inspección Inmobiliaria', status:'Activo',
            progress:72, health:'good', owner:'luis', logo:'PG', color:'bg-blue-600',
            contacts: [
                { name:'Pedro García', role:'CEO / Fundador', email:'pedro@pgproyectos.com', phone:'+51 999 123 456', primary:true },
                { name:'María López', role:'Coordinadora de Marketing', email:'maria@pgproyectos.com', phone:'+51 998 654 321', primary:false }
            ],
            nextMeeting: { date:'2026-04-15', time:'10:00', title:'Revisión quincenal de contenido' },
            pendingTasks:12, reviewItems:3,
            onboarding: {
                complete:100,
                steps: [
                    { id:1, title:'Datos administrativos', done:true, desc:'RUC, razón social, dirección fiscal' },
                    { id:2, title:'Contactos principales', done:true, desc:'CEO, marketing, operaciones' },
                    { id:3, title:'Accesos a redes sociales', done:true, desc:'Instagram, Facebook, TikTok, LinkedIn' },
                    { id:4, title:'Acceso a Business Manager', done:true, desc:'Meta Business Suite completo' },
                    { id:5, title:'Material de marca', done:true, desc:'Logo, manual de identidad, plantillas' },
                    { id:6, title:'Kick-off meeting', done:true, desc:'Reunión inicial con equipo completo' },
                    { id:7, title:'Definición de objetivos Q2', done:true, desc:'Leads, awareness, autoridad' },
                    { id:8, title:'Configuración de herramientas', done:true, desc:'Pixel, GA4, GTM' }
                ],
                data: {
                    razonSocial:'PG Proyectos e Inspecciones S.A.C.',
                    ruc:'20612345678',
                    direccion:'Av. Javier Prado Este 4521, Surco, Lima',
                    web:'www.pgproyectos.com',
                    instagram:'@pgproyectos',
                    facebook:'PG Proyectos Inspecciones',
                    tiktok:'@pgproyectos',
                    linkedin:'PG Proyectos',
                    youtube:'',
                    objetivos:'Generar 150 leads/mes para inspecciones residenciales. Posicionar como referente técnico en Lima.',
                    propuestaValor:'Inspecciones técnicas a propiedades con equipo de ingenieros colegiados y reporte digital interactivo.',
                    tono:'Profesional / Técnico pero accesible',
                    buyerPersona:'Familias jóvenes (28-40) comprando su primer depa. Inversionistas que compran en planos.',
                    competidores:'Inspecciona Pe, Hogar Seguro, InspecPro'
                }
            },
            brief: {
                complete:90, lastUpdate:'2026-04-10', status:'Aprobado',
                negocio:'Realizamos inspecciones técnicas a propiedades inmobiliarias (departamentos y casas) para detectar vicios ocultos, deficiencias estructurales y problemas de instalaciones. Garantizamos inversiones seguras con reportes detallados.',
                propuestaValor:'Equipo de ingenieros colegiados con +500 inspecciones realizadas. Reporte digital interactivo entregado en 48 horas con fotografías, clasificación de severidad y recomendaciones técnicas.',
                servicios:'Inspección pre-compra, Inspección pre-entrega, Inspección de mantenimiento, Peritaje técnico, Auditoría de acabados',
                publicoObjetivo:'Primario: Familias jóvenes (28-40 años) comprando su primer departamento en Lima.\nSecundario: Inversionistas inmobiliarios que compran en planos y necesitan asegurar calidad de entrega.\nTerciario: Propietarios que buscan evaluar estado actual de su propiedad.',
                diferenciadores:'1. Ingenieros colegiados CIP\n2. Reporte digital interactivo (no PDF genérico)\n3. Garantía de detección\n4. 48hrs de entrega\n5. Equipo con tecnología (termografía, medidores de humedad)',
                competencia:'Inspecciona Pe: Fuerte en TikTok pero precios altos\nHogar Seguro: Trayectoria reconocida pero comunicación antigua\nInspecPro: Precio bajo pero calidad cuestionable',
                objetivosComerciales:'Facturar S/ 45,000/mes para Q3 2026. Cerrar 50 inspecciones/mes.',
                objetivosMarketing:'150 leads/mes vía Meta Ads. Alcanzar 15K seguidores en Instagram. Posicionar como referente en TikTok.',
                tono:'Profesional y técnico pero accesible. Genera confianza sin ser aburrido. Usa datos y evidencia visual. Tono educativo con toques de revelación. Evita ser informal o humorístico en exceso.',
                restricciones:'No usar imágenes de proyectos inmobiliarios específicos sin permiso. No criticar marcas competidoras directamente. No prometer resultados absolutos de inspección.',
                insights:'Los compradores confían más en profesionales que muestran evidencia real. Los videos de "hallazgos" generan altísimo engagement. El mercado está sub-educado sobre vicios ocultos.',
                dolores:'Miedo a comprar un depa con fallas ocultas. No saber qué revisar antes de firmar. Sentirse estafado por inmobiliarias. No tener a quién reclamar después.',
                mensajePrincipal:'Tu inversión merece una inspección profesional. No firmes sin inspeccionar.',
                ctaPrincipal:'Agenda tu inspección gratuita / Cotiza tu inspección'
            },
            meetings: [
                { id:'m1', date:'2026-04-15', time:'10:00', duration:'45 min', type:'Revisión quincenal', participants:['Pedro García','María López','Luis Rodríguez','Ana Martínez'], status:'Programada',
                  summary:'', agreements:[], actionItems:[], recording:false },
                { id:'m2', date:'2026-04-01', time:'10:00', duration:'60 min', type:'Revisión mensual', participants:['Pedro García','Luis Rodríguez','Ana Martínez','Diego Torres'], status:'Completada',
                  summary:'Se revisaron resultados de Marzo. El alcance creció 12% pero los leads bajaron 5%. Se decidió cambiar enfoque de campaña de conversión. Pedro pidió más contenido educativo sobre inspecciones eléctricas. Se aprobó presupuesto adicional de $200 para TikTok.',
                  agreements:['Aumentar presupuesto TikTok en $200','Crear serie de contenido sobre instalaciones eléctricas','Programar sesión de fotos en obra para la próxima semana'],
                  actionItems:['Guión video sobre instalaciones eléctricas - Ana','Reconfigurar campaña Meta - Diego','Cotizar sesión de fotos - Miguel'],
                  recording:true, tags:['Estratégica','Presupuesto','Contenido'] },
                { id:'m3', date:'2026-03-18', time:'10:00', duration:'50 min', type:'Revisión quincenal', participants:['Pedro García','María López','Ana Martínez'], status:'Completada',
                  summary:'Se presentó el benchmark de competencia. Pedro quedó impresionado con el análisis de Inspecciona Pe en TikTok. Se definieron los 3 pilares de contenido principales. María solicitó más carruseles educativos.',
                  agreements:['Pilares: Educación técnica, Confianza comercial, Detrás de escena','Priorizar carruseles educativos en Instagram','Iniciar presencia en TikTok en Abril'],
                  actionItems:['Brief pilares de contenido - Luis','Crear template carrusel - Sofía','Plan TikTok Q2 - Ana'],
                  recording:true, tags:['Benchmark','Pilares','Contenido'] },
                { id:'m4', date:'2026-03-04', time:'15:00', duration:'90 min', type:'Kick-off', participants:['Pedro García','María López','Luis Rodríguez','Ana Martínez','Diego Torres','Daniela Flores'], status:'Completada',
                  summary:'Reunión de kick-off del proyecto. Se presentó al equipo, se revisó la propuesta comercial, se definieron expectativas y KPIs principales. Pedro compartió visión de la empresa y plan de crecimiento.',
                  agreements:['Reportes mensuales','Reuniones quincenales martes 10am','KPI principal: 100 leads/mes para Junio'],
                  actionItems:['Enviar accesos a redes - María','Completar onboarding - Daniela','Iniciar benchmark - Luis'],
                  recording:true, tags:['Kick-off','Onboarding'] }
            ],
            files: {
                driveConnected:true,
                folders: [
                    { id:'f1', name:'01_Branding', icon:'palette', files:[
                        { id:'a1', name:'Logo_PG_Principal.svg', type:'image', size:'245 KB', date:'2026-03-05', status:'Aprobado' },
                        { id:'a2', name:'Manual_Identidad_v2.pdf', type:'pdf', size:'3.2 MB', date:'2026-03-05', status:'Aprobado' },
                        { id:'a3', name:'Paleta_Colores.png', type:'image', size:'85 KB', date:'2026-03-05', status:'Aprobado' },
                        { id:'a4', name:'Tipografias.zip', type:'archive', size:'12 MB', date:'2026-03-06', status:'Aprobado' }
                    ]},
                    { id:'f2', name:'02_Contenido_Abril', icon:'video', files:[
                        { id:'a5', name:'Reel_Vicios_Ocultos_v1.mp4', type:'video', size:'48 MB', date:'2026-04-08', status:'En revisión' },
                        { id:'a6', name:'Carrusel_Tablero_Electrico.psd', type:'design', size:'25 MB', date:'2026-04-10', status:'En proceso' },
                        { id:'a7', name:'Story_Testimonio_Cliente.mp4', type:'video', size:'15 MB', date:'2026-04-07', status:'Aprobado' },
                        { id:'a8', name:'Post_Estatico_Tips.png', type:'image', size:'1.8 MB', date:'2026-04-09', status:'Pendiente' }
                    ]},
                    { id:'f3', name:'03_Campañas', icon:'target', files:[
                        { id:'a9', name:'Brief_Campaña_Leads_Q2.pdf', type:'pdf', size:'890 KB', date:'2026-03-28', status:'Aprobado' },
                        { id:'a10', name:'Creatividades_Meta_v3.zip', type:'archive', size:'35 MB', date:'2026-04-05', status:'En revisión' }
                    ]},
                    { id:'f4', name:'04_Reportes', icon:'bar-chart-2', files:[
                        { id:'a11', name:'Reporte_Marzo_2026.pdf', type:'pdf', size:'2.1 MB', date:'2026-04-02', status:'Entregado' },
                        { id:'a12', name:'Reporte_Febrero_2026.pdf', type:'pdf', size:'1.9 MB', date:'2026-03-03', status:'Entregado' }
                    ]},
                    { id:'f5', name:'05_Referencias', icon:'bookmark', files:[
                        { id:'a13', name:'Ref_TikTok_Competencia.pdf', type:'pdf', size:'5 MB', date:'2026-03-20', status:'Interno' },
                        { id:'a14', name:'Moodboard_Visual.jpg', type:'image', size:'8 MB', date:'2026-03-15', status:'Interno' }
                    ]}
                ]
            },
            benchmark: {
                status:'Completado', lastUpdate:'2026-03-28',
                overview:'El mercado de inspecciones inmobiliarias en Lima está en etapa de crecimiento. Pocas empresas tienen presencia digital profesional. La confianza y el uso de evidencia visual son los principales drivers de decisión. Nadie domina TikTok con contenido de inspecciones.',
                competitors:[
                    { name:'Inspecciona Pe', logo:'IP', web:'inspecciona.pe', instagram:8200, tiktok:15000, facebook:3400,
                      strengths:['Fuerte presencia en TikTok','Contenido de hallazgos virales','Buen engagement','Marca personal del fundador'],
                      weaknesses:['Precios altos (+40% vs mercado)','No tienen Google Ads','Landing page básica','Sin sistema de leads automatizado'],
                      content:'Videos cortos de hallazgos virales en TikTok. Poca presencia en Instagram. Sin estrategia de carruseles educativos.',
                      tone:'Informal, revelador, sensacionalista', pricing:'Desde S/450 por inspección básica' },
                    { name:'Hogar Seguro', logo:'HS', web:'hogarseguro.pe', instagram:2100, tiktok:0, facebook:5600,
                      strengths:['Trayectoria de 10+ años','Alianzas con inmobiliarias','Base de datos de clientes grandes','Reputación establecida'],
                      weaknesses:['Comunicación anticuada','Sin presencia en TikTok','Web no optimizada para mobile','Contenido genérico en redes'],
                      content:'Posts estáticos informativos en Facebook. Instagram con baja frecuencia. Sin video.',
                      tone:'Formal, corporativo, distante', pricing:'Desde S/350 por inspección' },
                    { name:'InspecPro Lima', logo:'IL', web:'inspecpro.pe', instagram:950, tiktok:0, facebook:1200,
                      strengths:['Precio competitivo','Rapidez en entrega','Cobertura Lima y provincias'],
                      weaknesses:['Calidad cuestionable según reseñas','Sin marca visual','Cero contenido de valor','Web amateur'],
                      content:'Prácticamente inexistente. Solo publicaciones esporádicas.',
                      tone:'Sin tono definido', pricing:'Desde S/200 (sospechosamente bajo)' }
                ],
                matrix:[
                    { factor:'Presencia Digital', pg:4, comp1:4, comp2:2, comp3:1 },
                    { factor:'Calidad de Servicio', pg:5, comp1:4, comp2:4, comp3:2 },
                    { factor:'Precio Competitivo', pg:4, comp1:2, comp2:3, comp3:5 },
                    { factor:'Contenido de Valor', pg:3, comp1:4, comp2:1, comp3:1 },
                    { factor:'Tecnología', pg:5, comp1:3, comp2:3, comp3:2 },
                    { factor:'Reputación', pg:3, comp1:3, comp2:5, comp3:1 }
                ],
                insights:[
                    { type:'oportunidad', text:'Nadie está haciendo POV de inspecciones reales. Enorme potencial viral en TikTok e Instagram Reels.' },
                    { type:'oportunidad', text:'El contenido educativo sobre "qué revisar antes de comprar" tiene alta demanda y baja oferta.' },
                    { type:'amenaza', text:'Inspecciona Pe está creciendo rápido en TikTok. Si no entramos pronto, se posiciona como referente.' },
                    { type:'oportunidad', text:'Ningún competidor usa Google Ads para inspecciones. CPC estimado bajo ($0.30-0.60).' },
                    { type:'insight', text:'El 78% de los compradores buscan "inspección de departamento" en Google antes de contratar.' },
                    { type:'insight', text:'Los videos de "hallazgos ocultos" generan 3x más engagement que contenido institucional.' }
                ],
                opportunities:['Dominar TikTok con formato POV de inspecciones','Capturar búsquedas en Google Ads','Serie educativa en carruseles','Alianzas con inmobiliarias para referidos'],
                threats:['Crecimiento agresivo de Inspecciona Pe','Posible entrada de empresas grandes al sector','Estacionalidad del mercado inmobiliario']
            },
            strategy: {
                status:'Aprobada', lastUpdate:'2026-04-01',
                summary:'Posicionar PG Proyectos como el referente técnico en inspecciones inmobiliarias en Lima mediante contenido educativo y de revelación. Generar leads calificados a través de Meta Ads y Google Ads.',
                objective:'Alcanzar 150 leads/mes y 15K seguidores Instagram para Junio 2026.',
                positioning:'El equipo de ingenieros que protege tu inversión inmobiliaria.',
                pillars:['Educación técnica','Confianza y autoridad','Detrás de escena','Testimonios y casos'],
                audiences:[
                    { name:'Primer comprador', desc:'28-35, profesional, Lima Moderna, comprando primer depa', channels:['Instagram','TikTok','Google'] },
                    { name:'Inversionista', desc:'35-50, alto poder adquisitivo, compra en planos', channels:['Instagram','LinkedIn','Google'] },
                    { name:'Propietario', desc:'30-55, ya tiene propiedad, busca evaluación', channels:['Google','Facebook'] }
                ],
                campaigns:[
                    { name:'Inspección Segura', type:'Conversión', channel:'Meta Ads', budget:500, status:'Activa', leads:85, cpa:5.88 },
                    { name:'Búsqueda Inspecciones', type:'Search', channel:'Google Ads', budget:200, status:'Activa', leads:32, cpa:6.25 },
                    { name:'Video Vicios Ocultos', type:'Awareness', channel:'TikTok Ads', budget:300, status:'En preparación', leads:0, cpa:0 }
                ],
                budget:{ meta:500, google:200, tiktok:300, produccion:400, total:1400 },
                calendarMacro:[
                    { month:'Abril', focus:'Lanzar TikTok + Serie educativa IG', kpi:'80 leads' },
                    { month:'Mayo', focus:'Escalar campañas + Alianzas inmobiliarias', kpi:'120 leads' },
                    { month:'Junio', focus:'Consolidar autoridad + Optimizar CPA', kpi:'150 leads' }
                ],
                risks:['Competidor Inspecciona Pe escale primero','Presupuesto insuficiente para TikTok','Disponibilidad del equipo técnico para grabaciones'],
                nextSteps:['Grabar batch de 8 videos POV','Configurar campaña TikTok Ads','Crear landing page optimizada','Definir alianzas inmobiliarias']
            },
            content: {
                calendar:[
                    { id:'c1', date:'2026-04-14', title:'Reel: 5 vicios ocultos que no ves', format:'Reel', channel:'Instagram', status:'Publicado', assignee:'ana', priority:'Alta' },
                    { id:'c2', date:'2026-04-15', title:'Carrusel: Guía del comprador inteligente', format:'Carrusel', channel:'Instagram', status:'Programado', assignee:'sofia', priority:'Media' },
                    { id:'c3', date:'2026-04-16', title:'TikTok: POV primera inspección', format:'Video Vertical', channel:'TikTok', status:'En revisión', assignee:'miguel', priority:'Alta' },
                    { id:'c4', date:'2026-04-17', title:'Story: Detrás de cámaras en obra', format:'Story', channel:'Instagram', status:'En proceso', assignee:'ana', priority:'Baja' },
                    { id:'c5', date:'2026-04-18', title:'Post: Testimonio cliente satisfecho', format:'Post Estático', channel:'Instagram', status:'Pendiente', assignee:'sofia', priority:'Media' },
                    { id:'c6', date:'2026-04-21', title:'Reel: Así revisamos un tablero eléctrico', format:'Reel', channel:'Instagram', status:'Backlog', assignee:'miguel', priority:'Alta' },
                    { id:'c7', date:'2026-04-22', title:'Carrusel: Errores al recibir un depa nuevo', format:'Carrusel', channel:'Instagram', status:'Backlog', assignee:'sofia', priority:'Media' },
                    { id:'c8', date:'2026-04-23', title:'TikTok: Red flags en tuberías', format:'Video Vertical', channel:'TikTok', status:'Backlog', assignee:'miguel', priority:'Alta' },
                    { id:'c9', date:'2026-04-25', title:'Post LinkedIn: Caso de éxito inspección', format:'Post', channel:'LinkedIn', status:'Backlog', assignee:'carlos', priority:'Baja' },
                    { id:'c10', date:'2026-04-28', title:'Reel: ¿Cuánto cuesta una inspección?', format:'Reel', channel:'Instagram', status:'Backlog', assignee:'ana', priority:'Media' }
                ],
                copies:[
                    { id:'cp1', title:'Copy campaña Inspección Segura', type:'Ad Copy', channel:'Meta Ads', tone:'Profesional', status:'Aprobado',
                      versions:[
                        { label:'Hook directo', text:'¿Vas a comprar un departamento? No firmes sin inspeccionar. Nuestro equipo de ingenieros detecta lo que no ves. 📋 Reporte en 48hrs.\n\n✅ +500 inspecciones realizadas\n✅ Ingenieros colegiados CIP\n✅ Reporte digital interactivo\n\n👉 Agenda tu inspección gratuita' },
                        { label:'Dolor', text:'El 40% de departamentos nuevos en Lima tienen fallas ocultas. No seas parte de esa estadística.\n\nPG Proyectos inspecciona tu próximo hogar con tecnología y experiencia.\n\n📱 Cotiza gratis en 2 minutos' }
                      ]},
                    { id:'cp2', title:'Copies orgánicos Abril', type:'Orgánico', channel:'Instagram', tone:'Educativo', status:'En revisión',
                      versions:[
                        { label:'Educativo', text:'¿Sabías que un tablero eléctrico mal instalado puede provocar un incendio? 🔥\n\nEn nuestra última inspección detectamos:\n→ Cables sin protección\n→ Llave térmica subdimensionada\n→ Sin pozo a tierra\n\nNo esperes a que sea tarde. Guarda este post y compártelo con alguien que esté por comprar.\n\n#InspecciónInmobiliaria #ViciosOcultos #DepartamentoNuevo' },
                        { label:'Caso real', text:'CASO REAL: Le salvamos S/ 25,000 a esta familia 💰\n\nNos contactaron porque "algo no se veía bien" en su depa nuevo.\n\nDetectamos:\n❌ Filtración en techo del baño\n❌ Grietas en muros portantes\n❌ Instalación sanitaria deficiente\n\nLa inmobiliaria tuvo que reparar todo antes de la entrega.\n\n¿Quieres la misma tranquilidad? Link en bio 👆' }
                      ]}
                ],
                community:[
                    { id:'cm1', from:'@juanperez92', channel:'Instagram', type:'Consulta', message:'Hola, ¿hacen inspecciones en Arequipa también?', date:'2026-04-13', urgency:'media', suggestedReply:'¡Hola Juan! Por el momento solo atendemos en Lima Metropolitana, pero estamos trabajando en expandirnos. ¿Te gustaría que te avisemos cuando estemos en Arequipa? 😊', status:'Pendiente' },
                    { id:'cm2', from:'@mariainvierte', channel:'Instagram', type:'Interés', message:'Excelente contenido! ¿Cuánto cuesta una inspección para un depa de 80m2?', date:'2026-04-13', urgency:'alta', suggestedReply:'¡Gracias María! Para un departamento de 80m² la inspección completa tiene un valor de S/ 320. Incluye reporte digital interactivo en 48hrs. ¿Te gustaría agendar? Te dejo el link en bio o escríbenos al WhatsApp 📱', status:'Pendiente' },
                    { id:'cm3', from:'@carlos_arq', channel:'TikTok', type:'Positivo', message:'Gran contenido, como arquitecto confirmo todo lo que dicen 👏', date:'2026-04-12', urgency:'baja', suggestedReply:'¡Muchas gracias Carlos! Siempre es valioso el respaldo de profesionales del sector. ¿Te gustaría colaborar en algún contenido? 🏗️', status:'Respondido' },
                    { id:'cm4', from:'@ana_mama_primeriza', channel:'Facebook', type:'Consulta', message:'Mi esposo y yo vamos a recibir nuestro depa en mayo, ¿llegan a hacer la inspección antes?', date:'2026-04-11', urgency:'alta', suggestedReply:'¡Hola Ana! Claro que sí, tenemos disponibilidad inmediata. Lo ideal es hacer la inspección pre-entrega al menos 1 semana antes de firmar. ¿Nos escribes al WhatsApp para coordinar? 📋', status:'Respondido' }
                ],
                approvals:[
                    { id:'ap1', piece:'Reel: 5 vicios ocultos que no ves', format:'Reel', date:'2026-04-12', status:'Aprobado', clientNote:'Me encantó, solo cambiar la música del final.', history:[{date:'2026-04-10',action:'Enviado a revisión'},{date:'2026-04-11',action:'Cliente solicitó cambio de música'},{date:'2026-04-12',action:'Aprobado con cambio menor'}] },
                    { id:'ap2', piece:'Carrusel: Guía del comprador inteligente', format:'Carrusel', date:'2026-04-13', status:'En revisión', clientNote:'', history:[{date:'2026-04-13',action:'Enviado a revisión'}] },
                    { id:'ap3', piece:'TikTok: POV primera inspección', format:'Video', date:'2026-04-11', status:'Corregir', clientNote:'El texto en pantalla es muy pequeño. Y quiero que se vea más el logo de la empresa.', history:[{date:'2026-04-09',action:'Enviado a revisión'},{date:'2026-04-11',action:'Cliente solicitó correcciones'}] }
                ]
            },
            tasks:[
                { id:'t1', title:'Guion video "Vicios ocultos en depas nuevos"', desc:'Escribir guion completo del Reel sobre vicios ocultos más comunes en departamentos nuevos. Duración: 30-60 segundos.', status:'En revisión', assignee:'ana', priority:'Alta', format:'Reel', channel:'Instagram', dueDate:'2026-04-16', subtasks:[{text:'Escribir hook',done:true},{text:'Desarrollar 3 escenas',done:true},{text:'Escribir CTA final',done:true},{text:'Revisión ortográfica',done:false}], comments:[{author:'ana',text:'Listo el primer borrador, incorporé el hallazgo del tablero eléctrico.',date:'2026-04-12'},{author:'luis',text:'Muy bueno, solo ajustar el hook inicial para que sea más impactante.',date:'2026-04-13'}], tags:['Contenido','Urgente'] },
                { id:'t2', title:'Diseño carrusel "Qué revisamos en un tablero eléctrico"', desc:'Crear carrusel educativo de 8 slides explicando paso a paso qué se revisa en un tablero eléctrico.', status:'En proceso', assignee:'sofia', priority:'Alta', format:'Carrusel', channel:'Instagram', dueDate:'2026-04-18', subtasks:[{text:'Boceto de slides',done:true},{text:'Diseño en Figma',done:false},{text:'Copy de cada slide',done:true},{text:'Aprobación cliente',done:false}], comments:[{author:'sofia',text:'Estoy en el slide 5, queda lindo con las fotos reales.',date:'2026-04-13'}], tags:['Diseño','Educativo'] },
                { id:'t3', title:'Configurar campaña Leads Q2 en Meta', desc:'Crear nueva campaña de conversión optimizada para leads. Incluir 3 ad sets con diferentes audiencias.', status:'Backlog', assignee:'diego', priority:'Alta', format:'Ads', channel:'Meta Ads', dueDate:'2026-04-20', subtasks:[{text:'Definir audiencias',done:true},{text:'Crear creatividades',done:false},{text:'Configurar pixel events',done:true},{text:'Setup campaña',done:false}], comments:[], tags:['Ads','Leads'] },
                { id:'t4', title:'Video POV inspección en obra (grabación)', desc:'Coordinar y grabar video POV de inspección real en departamento nuevo. Usar GoPro y cámara secundaria.', status:'En proceso', assignee:'miguel', priority:'Alta', format:'Video Vertical', channel:'TikTok', dueDate:'2026-04-17', subtasks:[{text:'Coordinar con Pedro fecha',done:true},{text:'Preparar equipo',done:true},{text:'Grabar en locación',done:false},{text:'Edición básica',done:false}], comments:[{author:'miguel',text:'Confirmada grabación para el jueves en obra de Surco.',date:'2026-04-13'}], tags:['Audiovisual','TikTok'] },
                { id:'t5', title:'Copy para campaña Google Ads "Inspección Lima"', desc:'Redactar headlines y descripciones para 3 grupos de anuncios en Google Search.', status:'Aprobado', assignee:'carlos', priority:'Media', format:'Ads', channel:'Google Ads', dueDate:'2026-04-15', subtasks:[{text:'Research keywords',done:true},{text:'Headlines grupo 1',done:true},{text:'Headlines grupo 2',done:true},{text:'Descripciones',done:true}], comments:[], tags:['Copy','Ads'] },
                { id:'t6', title:'Responder comentarios pendientes IG semana 15', desc:'Revisar y responder todos los comentarios e inbox pendientes de Instagram.', status:'Esperando cliente', assignee:'valentina', priority:'Media', format:'Community', channel:'Instagram', dueDate:'2026-04-14', subtasks:[{text:'Comentarios posts',done:true},{text:'Inbox',done:true},{text:'Respuestas stories',done:false}], comments:[], tags:['Community'] },
                { id:'t7', title:'Reporte mensual Marzo', desc:'Consolidar métricas, insights y recomendaciones del mes de Marzo.', status:'Aprobado', assignee:'luis', priority:'Alta', format:'Reporte', channel:'Todos', dueDate:'2026-04-05', subtasks:[{text:'Recopilar métricas',done:true},{text:'Análisis de contenido',done:true},{text:'Recomendaciones',done:true},{text:'Diseño del reporte',done:true}], comments:[], tags:['Reporte'] },
                { id:'t8', title:'Crear landing page para campaña Q2', desc:'Diseñar y maquetar landing page orientada a conversión para la campaña de leads Q2.', status:'Backlog', assignee:'sofia', priority:'Alta', format:'Web', channel:'Google Ads', dueDate:'2026-04-25', subtasks:[{text:'Wireframe',done:false},{text:'Diseño visual',done:false},{text:'Desarrollo HTML',done:false},{text:'Testing',done:false}], comments:[], tags:['Web','Conversión'] },
                { id:'t9', title:'Story detrás de cámaras sesión de grabación', desc:'Capturar y publicar 3-5 stories mostrando proceso de grabación en obra.', status:'Programado', assignee:'ana', priority:'Baja', format:'Story', channel:'Instagram', dueDate:'2026-04-17', subtasks:[], comments:[], tags:['Stories'] },
                { id:'t10', title:'Optimizar audiencias campaña Meta activa', desc:'Revisar rendimiento de audiencias actuales y ajustar targeting basado en datos de Marzo.', status:'En proceso', assignee:'diego', priority:'Media', format:'Ads', channel:'Meta Ads', dueDate:'2026-04-16', subtasks:[{text:'Analizar CPAs por audiencia',done:true},{text:'Identificar audiencias top',done:true},{text:'Crear lookalikes nuevos',done:false},{text:'Desactivar bajo rendimiento',done:false}], comments:[{author:'diego',text:'Las audiencias de interés inmobiliario tienen CPA 35% menor. Voy a escalar esas.',date:'2026-04-12'}], tags:['Ads','Optimización'] },
                { id:'t11', title:'Post LinkedIn caso de éxito', desc:'Redactar post de caso de éxito para LinkedIn de Pedro. Tono profesional y de autoridad.', status:'Backlog', assignee:'carlos', priority:'Baja', format:'Post', channel:'LinkedIn', dueDate:'2026-04-25', subtasks:[], comments:[], tags:['LinkedIn'] },
                { id:'t12', title:'Editar y subtitular Reel vicios ocultos', desc:'Post-producción del reel grabado. Agregar subtítulos, música y transiciones.', status:'En revisión', assignee:'miguel', priority:'Alta', format:'Reel', channel:'Instagram', dueDate:'2026-04-14', subtasks:[{text:'Corte base',done:true},{text:'Subtítulos',done:true},{text:'Música',done:true},{text:'Color grading',done:true}], comments:[{author:'ana',text:'Se ve increíble, solo sugiero cortar 2 segundos al inicio.',date:'2026-04-13'}], tags:['Edición','Urgente'] }
            ],
            reports: {
                current: {
                    period:'Marzo 2026',
                    kpis:{ alcance:45200, interacciones:3420, leads:128, cpl:3.85, seguidores:7500, publicaciones:18, engagement:4.2, clicks:2340 },
                    vs_anterior:{ alcance:12, interacciones:5, leads:24, cpl:-8, seguidores:18, publicaciones:6, engagement:0.5, clicks:15 },
                    topContent:[
                        { title:'Reel: "Lo que NO te dicen de tu depa nuevo"', views:12500, engagement:8.2, leads:15 },
                        { title:'Carrusel: "5 cosas que revisar antes de recibir"', views:8200, engagement:6.5, leads:8 },
                        { title:'Post: Testimonio familia González', views:5100, engagement:4.8, leads:12 }
                    ],
                    worstContent:[
                        { title:'Story: Día del ingeniero', views:320, engagement:0.8, leads:0 },
                        { title:'Post: Frase motivacional', views:450, engagement:1.2, leads:0 }
                    ],
                    insights:['El contenido de hallazgos reales genera 3x más engagement que contenido institucional.','Google Ads tiene CPA 10% mayor pero calidad de lead superior.','TikTok aún no genera leads directos pero construye awareness.','Los carruseles educativos tienen el CTR más alto (4.2%).'],
                    recommendations:['Duplicar producción de Reels de hallazgos.','Reducir contenido motivacional genérico.','Crear landing page dedicada para Google Ads.','Invertir en contenido TikTok con consistencia.'],
                    chartData:{ labels:['Oct','Nov','Dic','Ene','Feb','Mar'], seguidores:[1200,1900,3000,5000,6200,7500], alcance:[8000,12000,18000,28000,35000,45200], leads:[15,28,45,72,103,128] }
                }
            },
            settings: {
                meetingFrequency:'Quincenal', meetingDay:'Martes', meetingTime:'10:00',
                reportFrequency:'Mensual', reportDay:'Primer lunes del mes',
                teamAssigned:['luis','ana','diego','sofia','carlos','miguel'],
                integrations:[
                    { name:'Google Drive', status:'Conectado', icon:'hard-drive' },
                    { name:'Google Calendar', status:'Conectado', icon:'calendar' },
                    { name:'Meta Business Suite', status:'Conectado', icon:'facebook' },
                    { name:'Google Ads', status:'Conectado', icon:'search' },
                    { name:'TikTok Business', status:'Pendiente', icon:'music' },
                    { name:'Google Analytics 4', status:'Conectado', icon:'activity' }
                ],
                alerts:['Tarea vencida sin completar','Pieza sin aprobación > 48hrs','Reunión sin resumen > 24hrs'],
                tags:['Premium','Inmobiliario','Técnico','Q2 2026']
            }
        },
        // ========== 2. R-VISION ==========
        {
            id:'r-vision', name:'R-Vision', industry:'Visualización 3D y Tecnología', status:'Onboarding',
            progress:25, health:'good', owner:'diego', logo:'RV', color:'bg-purple-600',
            contacts:[
                { name:'Ricardo Vargas', role:'Director General', email:'ricardo@rvision.pe', phone:'+51 997 111 222', primary:true },
                { name:'Alejandra Ríos', role:'Comercial', email:'alejandra@rvision.pe', phone:'+51 996 333 444', primary:false }
            ],
            nextMeeting:{ date:'2026-04-16', time:'15:00', title:'Revisión de onboarding' },
            pendingTasks:8, reviewItems:0,
            onboarding:{ complete:60,
                steps:[ {id:1,title:'Datos administrativos',done:true,desc:'RUC y datos fiscales'}, {id:2,title:'Contactos principales',done:true,desc:'Equipo directivo'}, {id:3,title:'Accesos a redes sociales',done:true,desc:'Instagram y LinkedIn'}, {id:4,title:'Acceso a Business Manager',done:false,desc:'Pendiente de configurar'}, {id:5,title:'Material de marca',done:true,desc:'Portafolio 3D y branding'}, {id:6,title:'Kick-off meeting',done:true,desc:'Completado 2026-04-08'}, {id:7,title:'Definición de objetivos',done:false,desc:'Pendiente segunda reunión'}, {id:8,title:'Configuración de herramientas',done:false,desc:'Pixel y GA4'} ],
                data:{ razonSocial:'R-Vision Studio S.A.C.', ruc:'20698765432', direccion:'Calle Las Begonias 450, San Isidro, Lima', web:'www.rvision.pe', instagram:'@rvisionstudio', facebook:'', tiktok:'', linkedin:'R-Vision Studio', youtube:'R-Vision', objetivos:'Posicionar como estudio líder de visualización 3D en Perú. Generar leads B2B.', propuestaValor:'Renders hiperrealistas y recorridos virtuales para inmobiliarias y arquitectos.', tono:'Innovador, visual, tech-premium', buyerPersona:'Inmobiliarias y estudios de arquitectura que buscan presentar proyectos con calidad fotorrealista.', competidores:'Render Studio, 3DArq, VistaReal' }
            },
            brief:{ complete:40, lastUpdate:'2026-04-10', status:'En proceso',
                negocio:'Estudio de visualización 3D especializado en renders arquitectónicos y recorridos virtuales para el sector inmobiliario y de diseño.',
                propuestaValor:'Renders fotorrealistas en 5 días hábiles con revisiones ilimitadas. Tecnología Unreal Engine para recorridos interactivos.',
                servicios:'Renders exteriores, Renders interiores, Recorridos virtuales, Videos animados, Realidad virtual inmobiliaria',
                publicoObjetivo:'Inmobiliarias medianas y grandes en Lima. Estudios de arquitectura. Constructoras con proyectos premium.',
                diferenciadores:'Uso de Unreal Engine, plazo de entrega rápido, pricing transparente.',
                competencia:'', objetivosComerciales:'10 clientes nuevos B2B en Q2.', objetivosMarketing:'Awareness en LinkedIn y portfolio web.',
                tono:'Tech-premium, innovador, visual.', restricciones:'No mostrar proyectos de clientes sin permiso.',
                insights:'', dolores:'', mensajePrincipal:'Visualiza tu proyecto antes de construirlo.', ctaPrincipal:'Solicita una demo gratuita' },
            meetings:[
                { id:'m5', date:'2026-04-16', time:'15:00', duration:'45 min', type:'Onboarding', participants:['Ricardo Vargas','Diego Torres','Luis Rodríguez'], status:'Programada', summary:'', agreements:[], actionItems:[], recording:false },
                { id:'m6', date:'2026-04-08', time:'14:00', duration:'75 min', type:'Kick-off', participants:['Ricardo Vargas','Alejandra Ríos','Luis Rodríguez','Diego Torres','Daniela Flores'], status:'Completada',
                  summary:'Kick-off exitoso. Ricardo presentó el portafolio y la visión de crecimiento. Objetivo: posicionar R-Vision como el estudio de visualización #1 en Perú. Se definieron canales prioritarios: LinkedIn e Instagram.',
                  agreements:['LinkedIn como canal principal','Portfolio web como hub','Contenido de proceso creativo'],
                  actionItems:['Recopilar portafolio completo - Alejandra','Configurar Business Manager - Diego','Benchmark de competencia - Luis'],
                  recording:true, tags:['Kick-off','Onboarding'] }
            ],
            files:{ driveConnected:false, folders:[
                { id:'f6', name:'01_Branding', icon:'palette', files:[
                    { id:'a15', name:'Logo_RVision.svg', type:'image', size:'180 KB', date:'2026-04-08', status:'Aprobado' },
                    { id:'a16', name:'BrandBook_v1.pdf', type:'pdf', size:'5 MB', date:'2026-04-08', status:'En revisión' }
                ]},
                { id:'f7', name:'02_Portfolio', icon:'image', files:[
                    { id:'a17', name:'Render_Proyecto_Miraflores.jpg', type:'image', size:'12 MB', date:'2026-04-09', status:'Aprobado' },
                    { id:'a18', name:'Recorrido_Virtual_Demo.mp4', type:'video', size:'85 MB', date:'2026-04-09', status:'Aprobado' }
                ]}
            ]},
            benchmark:null,
            strategy:null,
            content:{ calendar:[], copies:[], community:[], approvals:[] },
            tasks:[
                { id:'t13', title:'Setup de Business Manager', desc:'Crear y configurar Business Manager para R-Vision.', status:'En proceso', assignee:'diego', priority:'Alta', format:'Setup', channel:'Meta', dueDate:'2026-04-18', subtasks:[{text:'Crear cuenta BM',done:true},{text:'Agregar página FB',done:false},{text:'Conectar IG',done:false}], comments:[], tags:['Setup'] },
                { id:'t14', title:'Recopilación de portafolio 3D', desc:'Solicitar a Ricardo los mejores renders y videos para armar portfolio digital.', status:'Esperando cliente', assignee:'ana', priority:'Alta', format:'Gestión', channel:'Todos', dueDate:'2026-04-17', subtasks:[], comments:[{author:'ana',text:'Ya le envié la lista de assets necesarios a Ricardo.',date:'2026-04-10'}], tags:['Onboarding'] },
                { id:'t15', title:'Definir pilares de contenido', desc:'Proponer pilares de contenido basados en el brief y benchmark.', status:'Backlog', assignee:'luis', priority:'Media', format:'Estrategia', channel:'Todos', dueDate:'2026-04-22', subtasks:[], comments:[], tags:['Estrategia'] },
                { id:'t16', title:'Configurar Google Analytics 4', desc:'Instalar GA4 en la web de R-Vision para tracking.', status:'Backlog', assignee:'diego', priority:'Media', format:'Setup', channel:'Web', dueDate:'2026-04-20', subtasks:[], comments:[], tags:['Setup','Analytics'] }
            ],
            reports:{ current:{ period:'Marzo 2026', kpis:{ alcance:0, interacciones:0, leads:0, cpl:0, seguidores:850, publicaciones:0, engagement:0, clicks:0 }, vs_anterior:{alcance:0,interacciones:0,leads:0,cpl:0,seguidores:0,publicaciones:0,engagement:0,clicks:0}, topContent:[], worstContent:[], insights:['Cliente en fase de onboarding. Aún no hay métricas de campaña.'], recommendations:['Completar onboarding para iniciar operaciones.'], chartData:{labels:['Oct','Nov','Dic','Ene','Feb','Mar'],seguidores:[500,550,600,680,750,850],alcance:[0,0,0,0,0,0],leads:[0,0,0,0,0,0]} } },
            settings:{ meetingFrequency:'Semanal', meetingDay:'Miércoles', meetingTime:'15:00', reportFrequency:'Mensual', reportDay:'Primera semana', teamAssigned:['diego','luis','ana','daniela'],
                integrations:[ {name:'Google Drive',status:'Pendiente',icon:'hard-drive'}, {name:'Google Calendar',status:'Conectado',icon:'calendar'}, {name:'Meta Business Suite',status:'Pendiente',icon:'facebook'}, {name:'LinkedIn Business',status:'Pendiente',icon:'linkedin'} ],
                alerts:['Tarea vencida sin completar'], tags:['Nuevo','Tech','B2B'] }
        },
        // ========== 3. CAYEN INMOBILIARIA ==========
        {
            id:'cayen-inmobiliaria', name:'Cayen Inmobiliaria', industry:'Bienes Raíces', status:'Activo',
            progress:85, health:'warning', owner:'daniela', logo:'CI', color:'bg-emerald-600',
            contacts:[
                { name:'Carolina Yépez', role:'Gerente General', email:'carolina@cayeninmobiliaria.com', phone:'+51 991 555 666', primary:true },
                { name:'Fernando Navarro', role:'Director Comercial', email:'fernando@cayeninmobiliaria.com', phone:'+51 992 777 888', primary:false }
            ],
            nextMeeting:{ date:'2026-04-15', time:'09:00', title:'Revisión urgente pipeline de leads' },
            pendingTasks:24, reviewItems:7,
            onboarding:{ complete:100,
                steps:[ {id:1,title:'Datos administrativos',done:true,desc:''}, {id:2,title:'Contactos principales',done:true,desc:''}, {id:3,title:'Accesos a redes',done:true,desc:''}, {id:4,title:'Business Manager',done:true,desc:''}, {id:5,title:'Material de marca',done:true,desc:''}, {id:6,title:'Kick-off',done:true,desc:''}, {id:7,title:'Objetivos',done:true,desc:''}, {id:8,title:'Herramientas',done:true,desc:''} ],
                data:{ razonSocial:'Cayen Inmobiliaria S.A.C.', ruc:'20567891234', direccion:'Av. El Polo 670, Surco, Lima', web:'www.cayeninmobiliaria.com', instagram:'@cayeninmobiliaria', facebook:'Cayen Inmobiliaria', tiktok:'@cayeninmobiliaria', linkedin:'Cayen Inmobiliaria', youtube:'', objetivos:'Vender 120 unidades del proyecto Los Olivos en 6 meses. Generar 300 leads/mes.', propuestaValor:'Inmobiliaria con 15 años de experiencia. Proyectos con diseño biofílico y áreas comunes premium.', tono:'Premium, aspiracional, confiable', buyerPersona:'Parejas jóvenes profesionales 28-45, NSE A-B, buscan primer hogar o inversión.', competidores:'Imagina Inmobiliaria, Edifica, Marcan' }
            },
            brief:{ complete:100, lastUpdate:'2026-03-15', status:'Aprobado',
                negocio:'Inmobiliaria con 15 años de trayectoria en Lima. Especializada en proyectos multifamiliares de segmento A-B con diseño biofílico y áreas comunes premium.',
                propuestaValor:'Proyectos que combinan diseño de vanguardia con sostenibilidad. Entrega puntual en los últimos 12 proyectos. Financiamiento directo.',
                servicios:'Venta de departamentos, Asesoría financiera, Gestión de créditos hipotecarios, Post-venta integral',
                publicoObjetivo:'Parejas jóvenes profesionales (28-45 años) de Lima Moderna, NSE A-B, que buscan su primer departamento o una inversión inmobiliaria con retorno.',
                diferenciadores:'Diseño biofílico certificado, Entrega puntual (0 atrasos), Financiamiento propio, App de avance de obra, Garantía post-entrega 2 años.',
                competencia:'Imagina: Diseño innovador pero precios muy altos\nEdifica: Volumen y reconocimiento pero diseño genérico\nMarcan: Buena ubicación pero acabados cuestionables',
                objetivosComerciales:'Vender 120 unidades del proyecto Los Olivos para Octubre 2026.', objetivosMarketing:'300 leads/mes, 8% tasa de cierre, CPL < $4.',
                tono:'Premium y aspiracional. Inspira confianza. Muestra estilo de vida, no solo concreto. Emocional pero no exagerado.',
                restricciones:'Todos los renders deben ser aprobados por la gerencia. No publicar precios sin autorización. No hacer comparaciones directas.', insights:'Los compradores valoran el show room virtual. El avance de obra genera confianza.', dolores:'Desconfianza por atrasos de otras inmobiliarias. Miedo a invertir sin ver avance. Complejidad del proceso hipotecario.', mensajePrincipal:'Tu hogar ideal existe y se está construyendo para ti.', ctaPrincipal:'Reserva tu visita al showroom / Descubre Los Olivos' },
            meetings:[
                { id:'m7', date:'2026-04-15', time:'09:00', duration:'60 min', type:'Revisión urgente', participants:['Carolina Yépez','Fernando Navarro','Daniela Flores','Luis Rodríguez','Diego Torres'], status:'Programada', summary:'', agreements:[], actionItems:[], recording:false, tags:['Urgente','Leads'] },
                { id:'m8', date:'2026-04-07', time:'10:00', duration:'50 min', type:'Revisión semanal', participants:['Fernando Navarro','Daniela Flores','Ana Martínez','Diego Torres'], status:'Completada',
                  summary:'Fernando mencionó que la tasa de cierre bajó al 5%. Se identificó que los leads de TikTok son de menor calidad. Se decidió redistribuir presupuesto hacia Google Ads y Meta Ads con audiencias más calificadas.',
                  agreements:['Reducir TikTok Ads en 50%','Aumentar Google Ads en 30%','Crear landing page específica por proyecto'],
                  actionItems:['Redistribuir budget - Diego','Landing Los Olivos - Sofía','Reporte calidad de leads - Daniela'],
                  recording:true, tags:['Leads','Budget','Urgente'] },
                { id:'m9', date:'2026-03-24', time:'10:00', duration:'45 min', type:'Revisión semanal', participants:['Carolina Yépez','Daniela Flores','Ana Martínez'], status:'Completada',
                  summary:'Se revisó el calendario de contenido de Abril. Carolina aprobó la dirección creativa del video de drone. Se solicitó más contenido de avance de obra para generar confianza.',
                  agreements:['4 contenidos por semana','Video drone bisemanal','Añadir testimonios de compradores'],
                  actionItems:['Calendario Abril - Ana','Coordinar drone - Miguel','Testimonios - Carlos'],
                  recording:true, tags:['Contenido','Aprobación'] }
            ],
            files:{ driveConnected:true, folders:[
                { id:'f8', name:'01_Branding', icon:'palette', files:[
                    { id:'a19', name:'Logo_Cayen_Principal.svg', type:'image', size:'320 KB', date:'2026-01-15', status:'Aprobado' },
                    { id:'a20', name:'Manual_Marca_Cayen_2026.pdf', type:'pdf', size:'8.5 MB', date:'2026-01-15', status:'Aprobado' }
                ]},
                { id:'f9', name:'02_Proyecto_Los_Olivos', icon:'building', files:[
                    { id:'a21', name:'Renders_Fachada_v4.zip', type:'archive', size:'120 MB', date:'2026-03-20', status:'Aprobado' },
                    { id:'a22', name:'Video_Drone_Avance_Marzo.mp4', type:'video', size:'250 MB', date:'2026-04-01', status:'Aprobado' },
                    { id:'a23', name:'Planos_Tipologias.pdf', type:'pdf', size:'15 MB', date:'2026-02-10', status:'Aprobado' },
                    { id:'a24', name:'Brochure_Digital.pdf', type:'pdf', size:'6 MB', date:'2026-03-01', status:'Aprobado' }
                ]},
                { id:'f10', name:'03_Creatividades_Abril', icon:'image', files:[
                    { id:'a25', name:'Ad_Los_Olivos_1.psd', type:'design', size:'18 MB', date:'2026-04-10', status:'En revisión' },
                    { id:'a26', name:'Video_Showroom_30s.mp4', type:'video', size:'65 MB', date:'2026-04-08', status:'Aprobado' },
                    { id:'a27', name:'Carrusel_Amenities.psd', type:'design', size:'22 MB', date:'2026-04-12', status:'Pendiente' }
                ]},
                { id:'f11', name:'04_Reportes', icon:'bar-chart-2', files:[
                    { id:'a28', name:'Reporte_Q1_2026.pdf', type:'pdf', size:'4.2 MB', date:'2026-04-03', status:'Entregado' }
                ]}
            ]},
            benchmark:{ status:'Completado', lastUpdate:'2026-02-20',
                overview:'El mercado inmobiliario en Lima Moderna está competido. Los diferenciadores clave son el diseño, la entrega puntual y la comunicación emocional. Las inmobiliarias que muestran avance de obra generan más confianza.',
                competitors:[
                    { name:'Imagina Inmobiliaria', logo:'IM', web:'imagina.pe', instagram:45000, tiktok:22000, facebook:38000,
                      strengths:['Diseño innovador','Gran comunidad social','Branding muy fuerte','Showroom experiencial'],
                      weaknesses:['Precios +20% sobre mercado','Han tenido atrasos','Poca presencia Google'],
                      content:'Contenido aspiracional de alta calidad. Videos de lifestyle. Influencer marketing.', tone:'Aspiracional, moderno, lifestyle', pricing:'Desde S/ 380K (2 dorms)' },
                    { name:'Edifica', logo:'ED', web:'edifica.pe', instagram:28000, tiktok:5000, facebook:42000,
                      strengths:['Mayor volumen de ventas','Trayectoria sólida','Diversificación de proyectos'],
                      weaknesses:['Diseño genérico','Comunicación corporativa fría','Acabados estándar'],
                      content:'Contenido institucional y de proyecto. Poca creatividad en redes.', tone:'Corporativo, seguro, institucional', pricing:'Desde S/ 310K (2 dorms)' }
                ],
                matrix:[ {factor:'Branding',pg:4,comp1:5,comp2:3,comp3:0}, {factor:'Producto',pg:5,comp1:4,comp2:3,comp3:0}, {factor:'Digital',pg:3,comp1:5,comp2:3,comp3:0}, {factor:'Precio',pg:4,comp1:2,comp2:4,comp3:0}, {factor:'Confianza',pg:5,comp1:3,comp2:4,comp3:0} ],
                insights:[ {type:'oportunidad',text:'Ningún competidor muestra avance de obra en tiempo real. Oportunidad de generar confianza.'}, {type:'oportunidad',text:'El formato de tour virtual interactivo no lo hace nadie bien. R-Vision podría proveer esto.'}, {type:'amenaza',text:'Imagina ha invertido fuertemente en influencers. Pueden captar el segmento joven.'}, {type:'insight',text:'El 65% de compradores investigan online al menos 2 meses antes de contactar.'} ],
                opportunities:['Avance de obra en tiempo real','Tour virtual interactivo','Testimonios de propietarios','Contenido educativo financiero'],
                threats:['Guerra de precios en la zona','Desconfianza generalizada por atrasos del sector','Regulaciones más estrictas'] },
            strategy:{ status:'Aprobada', lastUpdate:'2026-03-15',
                summary:'Posicionar a Cayen como la inmobiliaria confiable con diseño premium. Generar 300 leads/mes para el proyecto Los Olivos usando Meta Ads, Google Ads y contenido orgánico aspiracional.',
                objective:'Vender 120 unidades del proyecto Los Olivos antes de Octubre 2026.',
                positioning:'La inmobiliaria que cumple lo que promete. Diseño que se vive, no solo se muestra.',
                pillars:['Avance de obra transparente','Lifestyle y diseño','Testimonios reales','Educación financiera'],
                audiences:[ {name:'Primer hogar',desc:'Parejas 28-35, profesionales, Lima Moderna',channels:['Instagram','Meta Ads','Google']}, {name:'Inversionista',desc:'35-50, busca ROI inmobiliario',channels:['LinkedIn','Google','Meta']} ],
                campaigns:[ {name:'Los Olivos - Conversión',type:'Conversión',channel:'Meta Ads',budget:1200,status:'Activa',leads:210,cpa:5.71}, {name:'Los Olivos - Search',type:'Search',channel:'Google Ads',budget:600,status:'Activa',leads:85,cpa:7.06}, {name:'Branding - Awareness',type:'Awareness',channel:'Instagram Ads',budget:400,status:'Activa',leads:0,cpa:0} ],
                budget:{ meta:1200, google:600, tiktok:200, produccion:800, total:2800 },
                calendarMacro:[ {month:'Abril',focus:'Lanzar fase 2 Los Olivos + Evento showroom',kpi:'250 leads'}, {month:'Mayo',focus:'Escalar Google Ads + Contenido de avance',kpi:'300 leads'}, {month:'Junio',focus:'Video testimoniales + Retargeting',kpi:'300 leads'} ],
                risks:['Baja calidad de leads TikTok','Competencia agresiva de Imagina','Desaceleración del sector'],
                nextSteps:['Landing page específica Los Olivos','Video drone actualizado','Campaña testimonial con 3 compradores'] },
            content:{ calendar:[
                    { id:'c11', date:'2026-04-14', title:'Reel: Tour showroom Los Olivos', format:'Reel', channel:'Instagram', status:'Publicado', assignee:'miguel', priority:'Alta' },
                    { id:'c12', date:'2026-04-15', title:'Post: Tipología 2 dormitorios', format:'Post Estático', channel:'Instagram', status:'Programado', assignee:'sofia', priority:'Media' },
                    { id:'c13', date:'2026-04-16', title:'Video: Avance de obra abril', format:'Video', channel:'YouTube', status:'En proceso', assignee:'miguel', priority:'Alta' },
                    { id:'c14', date:'2026-04-17', title:'Story: Visita al showroom', format:'Story', channel:'Instagram', status:'Pendiente', assignee:'ana', priority:'Baja' },
                    { id:'c15', date:'2026-04-18', title:'Ad: Nueva campaña Los Olivos Fase 2', format:'Ad', channel:'Meta Ads', status:'En revisión', assignee:'diego', priority:'Alta' },
                    { id:'c16', date:'2026-04-21', title:'Reel: Testimonio familia compradora', format:'Reel', channel:'Instagram', status:'Backlog', assignee:'miguel', priority:'Alta' },
                    { id:'c17', date:'2026-04-22', title:'Carrusel: Proceso de compra paso a paso', format:'Carrusel', channel:'Instagram', status:'Backlog', assignee:'sofia', priority:'Media' },
                    { id:'c18', date:'2026-04-24', title:'TikTok: Recorrido depa modelo', format:'Video Vertical', channel:'TikTok', status:'Backlog', assignee:'miguel', priority:'Media' }
                ],
                copies:[ { id:'cp3', title:'Copy campaña Los Olivos Fase 2', type:'Ad Copy', channel:'Meta Ads', tone:'Premium', status:'En revisión',
                    versions:[ { label:'Aspiracional', text:'Tu próximo hogar tiene nombre: Los Olivos de Cayen.\n\n🌿 Diseño biofílico que abraza la naturaleza\n📐 Departamentos desde 60m² hasta 120m²\n🏋️ Gym, coworking, terraza BBQ y más\n📍 Surco, la mejor zona de Lima\n\nDesde S/ 289,000\n👉 Reserva tu visita al showroom' },
                      { label:'Urgencia', text:'⚠️ Fase 2 Los Olivos: solo quedan 18 unidades al precio de lanzamiento.\n\nNo dejes pasar esta oportunidad:\n✅ Entrega 2027\n✅ Financiamiento directo\n✅ Separación desde S/ 5,000\n\n📱 Reserva HOY tu visita' } ] } ],
                community:[ {id:'cm5',from:'@laura_busca_depa',channel:'Instagram',type:'Consulta',message:'¿Los depas de Los Olivos vienen con cocina equipada?',date:'2026-04-13',urgency:'alta',suggestedReply:'¡Hola Laura! Los departamentos de Los Olivos incluyen cocina con tablero de granito y muebles altos. El equipamiento de electrodomésticos es opcional con nuestros packs. ¿Te gustaría agendar una visita al showroom para verlo en persona? 🏠',status:'Pendiente'}, {id:'cm6',from:'@inversionista_pe',channel:'Facebook',type:'Interés',message:'¿Cuál es la rentabilidad estimada de alquiler en la zona?',date:'2026-04-12',urgency:'media',suggestedReply:'¡Excelente pregunta! La zona de Surco tiene una rentabilidad de alquiler del 5-6% anual. Nuestros departamentos de inversión (1-2 dorms) son los más demandados. ¿Te interesa una cotización personalizada?',status:'Pendiente'} ],
                approvals:[ {id:'ap4',piece:'Ad Los Olivos Fase 2',format:'Ad',date:'2026-04-12',status:'Corregir',clientNote:'El render de portada no es el correcto. Usar el de la fachada sur. Texto OK.',history:[{date:'2026-04-11',action:'Enviado'},{date:'2026-04-12',action:'Corrección solicitada'}]}, {id:'ap5',piece:'Video drone avance abril',format:'Video',date:'2026-04-13',status:'En revisión',clientNote:'',history:[{date:'2026-04-13',action:'Enviado'}]}, {id:'ap6',piece:'Carrusel amenidades',format:'Carrusel',date:'2026-04-10',status:'Aprobado',clientNote:'Perfecto, publicar.',history:[{date:'2026-04-09',action:'Enviado'},{date:'2026-04-10',action:'Aprobado'}]} ]
            },
            tasks:[
                { id:'t17', title:'Copy pauta "Los Olivos Fase 2"', desc:'Redactar variantes de copy para la nueva campaña de la Fase 2.', status:'En revisión', assignee:'carlos', priority:'Alta', format:'Ads', channel:'Meta Ads', dueDate:'2026-04-15', subtasks:[{text:'Versión aspiracional',done:true},{text:'Versión urgencia',done:true},{text:'Revisión tono',done:false}], comments:[{author:'daniela',text:'Carolina quiere un tono más premium en la versión aspiracional.',date:'2026-04-13'}], tags:['Ads','Copy','Urgente'] },
                { id:'t18', title:'Video dron avance de obra abril', desc:'Grabar y editar video drone del avance de obra de Los Olivos.', status:'En proceso', assignee:'miguel', priority:'Alta', format:'Video', channel:'YouTube', dueDate:'2026-04-18', subtasks:[{text:'Coordinar vuelo',done:true},{text:'Grabación',done:true},{text:'Edición',done:false},{text:'Subtítulos',done:false}], comments:[], tags:['Video','Drone'] },
                { id:'t19', title:'Landing page Los Olivos optimizada', desc:'Crear landing dedicada con formulario de leads para la Fase 2.', status:'En proceso', assignee:'sofia', priority:'Alta', format:'Web', channel:'Google Ads', dueDate:'2026-04-20', subtasks:[{text:'Wireframe',done:true},{text:'Diseño',done:true},{text:'Desarrollo',done:false},{text:'Formulario',done:false}], comments:[], tags:['Web','Leads'] },
                { id:'t20', title:'Redistribuir budget ads abril', desc:'Reducir TikTok Ads 50%, aumentar Google 30%.', status:'Aprobado', assignee:'diego', priority:'Alta', format:'Ads', channel:'Todos', dueDate:'2026-04-14', subtasks:[], comments:[], tags:['Budget'] },
                { id:'t21', title:'Coordinar sesión testimonial con compradores', desc:'Contactar 3 compradores del proyecto para grabar testimonio.', status:'Esperando cliente', assignee:'daniela', priority:'Media', format:'Video', channel:'Instagram', dueDate:'2026-04-22', subtasks:[], comments:[], tags:['Testimonial'] },
                { id:'t22', title:'Reporte semanal leads semana 15', desc:'Consolidar datos de leads por canal y calidad.', status:'En proceso', assignee:'daniela', priority:'Alta', format:'Reporte', channel:'Todos', dueDate:'2026-04-14', subtasks:[], comments:[], tags:['Reporte','Leads'] }
            ],
            reports:{ current:{ period:'Marzo 2026', kpis:{ alcance:125000, interacciones:8900, leads:285, cpl:4.21, seguidores:18500, publicaciones:28, engagement:3.8, clicks:6800 },
                vs_anterior:{ alcance:8, interacciones:-3, leads:5, cpl:12, seguidores:15, publicaciones:2, engagement:-0.5, clicks:10 },
                topContent:[ {title:'Reel: "Tu departamento soñado en Surco"',views:35000,engagement:5.5,leads:42}, {title:'Video: Avance de obra febrero',views:22000,engagement:4.1,leads:28}, {title:'Ad: Los Olivos precio lanzamiento',views:85000,engagement:2.8,leads:125} ],
                worstContent:[ {title:'Post: Feliz día de la mujer',views:1200,engagement:1.1,leads:0}, {title:'Story: Frase decoración',views:800,engagement:0.5,leads:0} ],
                insights:['Los ads de urgencia ("últimas unidades") convierten 40% mejor que los aspiracionales.','Los leads de TikTok tienen una tasa de cierre 70% menor que Meta Ads.','El video de avance de obra genera más confianza que renders.','La franja 7-9pm tiene el mejor engagement.'],
                recommendations:['Priorizar videos reales sobre renders en ads.','Crear contenido de avance de obra bisemanal.','Reducir inversión TikTok a awareness únicamente.','Implementar retargeting con video views.'],
                chartData:{ labels:['Oct','Nov','Dic','Ene','Feb','Mar'], seguidores:[8500,10200,12000,14000,16100,18500], alcance:[65000,72000,80000,95000,115000,125000], leads:[150,170,195,240,270,285] } } },
            settings:{ meetingFrequency:'Semanal', meetingDay:'Lunes', meetingTime:'09:00', reportFrequency:'Semanal', reportDay:'Lunes', teamAssigned:['daniela','luis','diego','ana','sofia','carlos','miguel','valentina'],
                integrations:[ {name:'Google Drive',status:'Conectado',icon:'hard-drive'}, {name:'Google Calendar',status:'Conectado',icon:'calendar'}, {name:'Meta Business Suite',status:'Conectado',icon:'facebook'}, {name:'Google Ads',status:'Conectado',icon:'search'}, {name:'TikTok Business',status:'Conectado',icon:'music'}, {name:'Google Analytics 4',status:'Conectado',icon:'activity'}, {name:'CRM Propio',status:'Conectado',icon:'database'} ],
                alerts:['Lead sin atender > 2hrs','Tarea vencida','Pieza sin aprobación > 24hrs','CPL > $5'], tags:['Premium','Inmobiliario','Alta inversión','Q2 2026'] }
        },
        // ========== 4. ADN CREATIVO ==========
        {
            id:'adn-creativo', name:'ADN Creativo', industry:'Agencia de Marketing', status:'Activo',
            progress:90, health:'good', owner:'ana', logo:'AD', color:'bg-orange-600',
            contacts:[ { name:'Andrés Domínguez', role:'Director Creativo', email:'andres@adncreativo.pe', phone:'+51 993 222 111', primary:true }, { name:'Natalia Sánchez', role:'Producción', email:'natalia@adncreativo.pe', phone:'+51 994 333 444', primary:false } ],
            nextMeeting:{ date:'2026-04-18', time:'11:00', title:'Revisión mensual de resultados' },
            pendingTasks:6, reviewItems:2,
            onboarding:{ complete:100, steps:[ {id:1,title:'Datos',done:true,desc:''}, {id:2,title:'Contactos',done:true,desc:''}, {id:3,title:'Redes',done:true,desc:''}, {id:4,title:'BM',done:true,desc:''}, {id:5,title:'Marca',done:true,desc:''}, {id:6,title:'Kickoff',done:true,desc:''}, {id:7,title:'Objetivos',done:true,desc:''}, {id:8,title:'Tools',done:true,desc:''} ],
                data:{ razonSocial:'ADN Creativo S.A.C.', ruc:'20478956321', direccion:'Jr. Colina 108, Miraflores, Lima', web:'www.adncreativo.pe', instagram:'@adncreativo', facebook:'ADN Creativo', tiktok:'@adncreativo', linkedin:'ADN Creativo', youtube:'ADN Creativo', objetivos:'Posicionar como agencia boutique #1 en Lima. 15 clientes para fin de año.', propuestaValor:'Creatividad data-driven. Equipos pequeños, resultados grandes.', tono:'Creativo, moderno, disruptivo pero profesional', buyerPersona:'Empresas medianas que buscan agencia boutique con resultados medibles.', competidores:'Shock MKT, Brandlab, Circus Grey (como referencia)' } },
            brief:{ complete:95, lastUpdate:'2026-04-05', status:'Aprobado', negocio:'Agencia de marketing boutique especializada en estrategia digital, contenido y performance para empresas medianas en Lima.', propuestaValor:'Equipos dedicados de máximo 5 personas por cliente. Creatividad basada en datos. Reporting transparente semanal.', servicios:'Estrategia digital, Community Management, Producción audiovisual, Performance ads, Branding', publicoObjetivo:'Empresas medianas con facturación > $500K, sin equipo de marketing interno, que buscan resultados medibles.', diferenciadores:'Modelo boutique, reporting semanal, equipo dedicado, creatividad data-driven.', competencia:'Shock MKT: Gran volumen pero servicio impersonal.\nBrandlab: Buen branding pero débil en performance.', objetivosComerciales:'15 clientes activos para diciembre 2026.', objetivosMarketing:'50 leads B2B mensuales. Posicionar en LinkedIn como agencia referente.', tono:'Creativo pero medible. Moderno sin ser frívolo. Profesional sin ser aburrido.', restricciones:'No trabajar con competencia directa de clientes actuales.', insights:'Las empresas medianas valoran transparencia y resultados medibles sobre creatividad pura.', dolores:'Agencias grandes las ignoran. Agencias pequeñas no cumplen. Falta de reporting claro.', mensajePrincipal:'Creatividad que se mide. Resultados que se sienten.', ctaPrincipal:'Agenda una consultoría gratuita' },
            meetings:[ { id:'m10', date:'2026-04-18', time:'11:00', duration:'45 min', type:'Revisión mensual', participants:['Andrés Domínguez','Ana Martínez','Luis Rodríguez'], status:'Programada', summary:'', agreements:[], actionItems:[], recording:false }, { id:'m11', date:'2026-03-21', time:'11:00', duration:'50 min', type:'Revisión mensual', participants:['Andrés Domínguez','Natalia Sánchez','Ana Martínez'], status:'Completada', summary:'Resultados de Marzo superaron objetivos. Andrés aprobó la nueva serie de contenido "Detrás del dato". Se definió participación en evento de marketing digital.', agreements:['Serie Detrás del Dato aprobada','Participar en MarketingConf Lima','Nuevo blog post semanal'], actionItems:['Guiones serie - Ana','Inscripción evento - Natalia','Blog setup - Carlos'], recording:true, tags:['Resultados','Contenido'] } ],
            files:{ driveConnected:true, folders:[ { id:'f12', name:'01_Branding', icon:'palette', files:[ { id:'a29', name:'Logo_ADN.svg', type:'image', size:'150 KB', date:'2026-01-10', status:'Aprobado' } ] }, { id:'f13', name:'02_Contenido', icon:'video', files:[ { id:'a30', name:'Reel_Detras_Dato_ep1.mp4', type:'video', size:'55 MB', date:'2026-04-05', status:'Aprobado' }, { id:'a31', name:'Carrusel_Tips_Ads.psd', type:'design', size:'15 MB', date:'2026-04-10', status:'En revisión' } ] } ] },
            benchmark:{ status:'Completado', lastUpdate:'2026-02-28', overview:'El mercado de agencias boutique en Lima está creciendo. Los clientes valoran transparencia y resultados sobre premios creativos.', competitors:[ { name:'Shock MKT', logo:'SM', web:'shockmkt.pe', instagram:12000, tiktok:8000, facebook:9000, strengths:['Gran volumen de clientes','Estructura operativa sólida'], weaknesses:['Servicio impersonal','Rotación de personal'], content:'Contenido de casos de éxito y tips genéricos.', tone:'Corporativo moderno', pricing:'Desde $2,000/mes' }, { name:'Brandlab', logo:'BL', web:'brandlab.pe', instagram:8500, tiktok:0, facebook:5000, strengths:['Excelente branding','Portfolio visual impresionante'], weaknesses:['Débil en performance','Precios altos'], content:'Portfolio de trabajos y behind the scenes.', tone:'Artístico premium', pricing:'Desde $3,000/mes' } ], matrix:[ {factor:'Creatividad',pg:4,comp1:3,comp2:5,comp3:0}, {factor:'Performance',pg:5,comp1:4,comp2:2,comp3:0}, {factor:'Servicio',pg:5,comp1:2,comp2:3,comp3:0}, {factor:'Precio',pg:4,comp1:3,comp2:2,comp3:0} ], insights:[ {type:'oportunidad',text:'Contenido educativo de marketing en LinkedIn tiene alta demanda y baja oferta.'}, {type:'insight',text:'Las empresas valoran reporting semanal más que premios creativos.'} ], opportunities:['LinkedIn como canal B2B principal','Webinars educativos','Partnerships con software'], threats:['Agencias grandes bajando precios','Freelancers con herramientas IA'] },
            strategy:{ status:'Aprobada', lastUpdate:'2026-03-10', summary:'Posicionar ADN Creativo como la agencia boutique data-driven referente en Lima a través de contenido educativo y thought leadership en LinkedIn.', objective:'50 leads B2B/mes y 15 clientes activos para Dic 2026.', positioning:'La agencia boutique que combina creatividad con datos.', pillars:['Educación en marketing digital','Cases y resultados','Cultura de agencia','Thought leadership'], audiences:[ {name:'Decision makers',desc:'CMOs y gerentes de empresas medianas',channels:['LinkedIn','Google','Email']} ], campaigns:[ {name:'Lead Gen LinkedIn',type:'Lead Gen',channel:'LinkedIn Ads',budget:600,status:'Activa',leads:35,cpa:17.14} ], budget:{ meta:300, google:200, tiktok:100, produccion:300, total:900 }, calendarMacro:[ {month:'Abril',focus:'Serie "Detrás del Dato" + Webinar',kpi:'40 leads'}, {month:'Mayo',focus:'Evento + Partnerships',kpi:'50 leads'} ], risks:['Mercado B2B más lento en conversión'], nextSteps:['Webinar sobre performance ads','Partnership con HubSpot local'] },
            content:{ calendar:[ { id:'c21', date:'2026-04-14', title:'Reel: Detrás del Dato Ep. 3', format:'Reel', channel:'Instagram', status:'Publicado', assignee:'ana', priority:'Alta' }, { id:'c22', date:'2026-04-16', title:'Post LinkedIn: Case study Cayen', format:'Post', channel:'LinkedIn', status:'Programado', assignee:'carlos', priority:'Alta' }, { id:'c23', date:'2026-04-18', title:'Blog: 5 errores en Meta Ads', format:'Blog', channel:'Web', status:'En proceso', assignee:'carlos', priority:'Media' }, { id:'c24', date:'2026-04-21', title:'Reel: Tips de copywriting', format:'Reel', channel:'Instagram', status:'Backlog', assignee:'ana', priority:'Media' } ], copies:[], community:[ {id:'cm7',from:'@marketero_pro',channel:'LinkedIn',type:'Positivo',message:'Excelente análisis. ¿Dan consultoría individual también?',date:'2026-04-13',urgency:'alta',suggestedReply:'¡Gracias! Sí, ofrecemos consultoría estratégica para empresas. Te envío los detalles por DM.',status:'Pendiente'} ], approvals:[ {id:'ap7',piece:'Blog: 5 errores en Meta Ads',format:'Blog',date:'2026-04-12',status:'En revisión',clientNote:'',history:[{date:'2026-04-12',action:'Enviado'}]} ] },
            tasks:[ { id:'t23', title:'Guiones serie Detrás del Dato Ep 4-6', desc:'Escribir guiones para los próximos 3 episodios de la serie.', status:'En proceso', assignee:'ana', priority:'Alta', format:'Reel', channel:'Instagram', dueDate:'2026-04-20', subtasks:[], comments:[], tags:['Serie','Contenido'] }, { id:'t24', title:'Blog: 5 errores comunes en Meta Ads', desc:'Artículo educativo para el blog y LinkedIn.', status:'En revisión', assignee:'carlos', priority:'Media', format:'Blog', channel:'Web', dueDate:'2026-04-18', subtasks:[], comments:[], tags:['Blog','Educativo'] }, { id:'t25', title:'Preparar webinar Performance Ads', desc:'Definir contenido, landing, email sequence.', status:'Backlog', assignee:'luis', priority:'Media', format:'Webinar', channel:'Zoom', dueDate:'2026-04-28', subtasks:[], comments:[], tags:['Webinar'] } ],
            reports:{ current:{ period:'Marzo 2026', kpis:{ alcance:32000, interacciones:4200, leads:42, cpl:12.50, seguidores:5800, publicaciones:16, engagement:5.1, clicks:1800 }, vs_anterior:{alcance:15,interacciones:22,leads:35,cpl:-12,seguidores:20,publicaciones:10,engagement:0.8,clicks:18}, topContent:[ {title:'Reel: Detrás del Dato Ep.2',views:15000,engagement:7.2,leads:8}, {title:'Post LinkedIn: ROI real',views:8500,engagement:5.5,leads:12} ], worstContent:[], insights:['LinkedIn genera los leads de mayor calidad.','El contenido behind the scenes humaniza la marca.'], recommendations:['Duplicar producción LinkedIn.','Lanzar webinars mensuales.'], chartData:{ labels:['Oct','Nov','Dic','Ene','Feb','Mar'], seguidores:[2200,2800,3500,4100,4800,5800], alcance:[10000,14000,18000,22000,28000,32000], leads:[10,15,20,28,32,42] } } },
            settings:{ meetingFrequency:'Mensual', meetingDay:'Tercer viernes', meetingTime:'11:00', reportFrequency:'Mensual', reportDay:'Primera semana', teamAssigned:['ana','luis','carlos','sofia'], integrations:[ {name:'Google Drive',status:'Conectado',icon:'hard-drive'}, {name:'Google Calendar',status:'Conectado',icon:'calendar'}, {name:'LinkedIn Business',status:'Conectado',icon:'linkedin'}, {name:'HubSpot',status:'Pendiente',icon:'database'} ], alerts:['Lead sin atender > 24hrs'], tags:['B2B','Agencia','Educativo'] }
        },
        // ========== 5. MARCA PERSONAL PIERRE ==========
        {
            id:'marca-pierre', name:'Marca Personal Pierre', industry:'Marca Personal / Negocios', status:'Planificación',
            progress:40, health:'good', owner:'luis', logo:'MP', color:'bg-slate-800',
            contacts:[ { name:'Pierre Morales', role:'Fundador / Speaker', email:'pierre@pierrmorales.com', phone:'+51 990 888 777', primary:true } ],
            nextMeeting:{ date:'2026-04-18', time:'11:00', title:'Aprobación de pilares de contenido' },
            pendingTasks:8, reviewItems:1,
            onboarding:{ complete:100, steps:[ {id:1,title:'Datos',done:true,desc:''}, {id:2,title:'Contactos',done:true,desc:''}, {id:3,title:'Redes',done:true,desc:''}, {id:4,title:'BM',done:true,desc:''}, {id:5,title:'Marca',done:true,desc:''}, {id:6,title:'Kickoff',done:true,desc:''}, {id:7,title:'Objetivos',done:true,desc:''}, {id:8,title:'Tools',done:true,desc:''} ],
                data:{ razonSocial:'Pierre Morales Consultoría', ruc:'10456789012', direccion:'San Isidro, Lima', web:'www.pierremorales.com', instagram:'@pierremorales', facebook:'Pierre Morales', tiktok:'@pierremorales', linkedin:'Pierre Morales', youtube:'Pierre Morales', objetivos:'100K seguidores en 6 meses. Lanzar curso online. Posicionar como speaker referente en Latam.', propuestaValor:'Consultor de negocios con +10 años de experiencia ayudando a emprendedores a escalar.', tono:'Inspirador, directo, ejecutivo pero cercano', buyerPersona:'Emprendedores y profesionales 25-40 que buscan crecer su negocio o marca personal.', competidores:'Carlos Muñoz, Jurgen Klaric (como referencia)' } },
            brief:{ complete:85, lastUpdate:'2026-04-08', status:'En revisión', negocio:'Consultor de negocios y speaker. Ayuda a emprendedores a sistematizar y escalar sus negocios con frameworks probados.', propuestaValor:'Experiencia real en 3 empresas propias. Framework "Escala en 90 Días". Mentoría práctica sin humo.', servicios:'Mentoría grupal, Consultoría 1:1, Cursos online, Conferencias, Masterclasses', publicoObjetivo:'Emprendedores y profesionales latinoamericanos 25-40 años que buscan escalar su negocio o emprender con claridad.', diferenciadores:'Experiencia real (no teórica), framework propio, contenido sin humo, resultados documentados.', competencia:'Carlos Muñoz: Gran audiencia pero percibido como superficial.\nJurgen Klaric: Excelente orador pero enfoque diferente.', objetivosComerciales:'Vender 500 plazas del curso online. 10 consultorías premium.', objetivosMarketing:'100K seguidores IG, 50K TikTok, lista de email de 5K.', tono:'Directo y sin rodeos. Inspirador pero con sustancia. Ejecutivo pero cercano. Sin fórmulas vacías.', restricciones:'No prometer resultados económicos específicos. Evitar tono de gurú.', insights:'La audiencia latam valora la autenticidad y la experiencia real sobre los títulos.', dolores:'Emprendedores estancados. Profesionales que quieren emprender pero no saben cómo. Desconfianza por "gurus" de internet.', mensajePrincipal:'Escalar tu negocio no requiere suerte, requiere sistema.', ctaPrincipal:'Únete al reto Escala en 90 Días' },
            meetings:[ { id:'m12', date:'2026-04-18', time:'11:00', duration:'60 min', type:'Revisión quincenal', participants:['Pierre Morales','Luis Rodríguez','Ana Martínez'], status:'Programada', summary:'', agreements:[], actionItems:[], recording:false }, { id:'m13', date:'2026-04-04', time:'11:00', duration:'75 min', type:'Kick-off', participants:['Pierre Morales','Luis Rodríguez','Ana Martínez','Carlos Vega'], status:'Completada', summary:'Pierre compartió su visión. Quiere posicionarse como referente en emprendimiento Latam, no como "gurú motivacional". Se definieron pilares: Sistemas de negocio, Mentalidad empresarial, Casos reales, Behind the scenes. Se aprobó el enfoque de video vertical como formato principal.', agreements:['4 videos por semana mínimo','Formato principal: Reels/TikTok','Evitar tono de gurú motivacional','Contenido basado en experiencia real'], actionItems:['Batch de guiones semana 1 - Ana','Setup cuentas publicitarias - Diego','Línea gráfica para redes - Sofía'], recording:true, tags:['Kick-off','Estrategia'] } ],
            files:{ driveConnected:true, folders:[ { id:'f14', name:'01_Branding', icon:'palette', files:[ { id:'a32', name:'Logo_Pierre_Dark.svg', type:'image', size:'95 KB', date:'2026-04-04', status:'Aprobado' }, { id:'a33', name:'Guia_Estilo_Redes.pdf', type:'pdf', size:'2 MB', date:'2026-04-06', status:'Aprobado' } ] }, { id:'f15', name:'02_Guiones', icon:'file-text', files:[ { id:'a34', name:'Batch_1_Guiones_Emprendimiento.doc', type:'document', size:'580 KB', date:'2026-04-10', status:'En revisión' }, { id:'a35', name:'Ideas_Contenido_Q2.xlsx', type:'spreadsheet', size:'120 KB', date:'2026-04-08', status:'Interno' } ] } ] },
            benchmark:{ status:'Completado', lastUpdate:'2026-04-06', overview:'El espacio de marca personal de negocios en Latam está saturado de contenido motivacional vacío. Hay oportunidad para un enfoque basado en experiencia real y frameworks prácticos.', competitors:[ { name:'Carlos Muñoz', logo:'CM', web:'carlosmunoz.com', instagram:2500000, tiktok:1800000, facebook:800000, strengths:['Audiencia masiva','Alta producción','Diversificación de ingresos'], weaknesses:['Percibido como superficial','Contenido repetitivo','Desconfianza creciente'], content:'Videos motivacionales, lifestyle, eventos masivos.', tone:'Hype, motivacional, polémico', pricing:'Cursos desde $297' }, { name:'Jurgen Klaric', logo:'JK', web:'jurgenklaric.com', instagram:850000, tiktok:450000, facebook:1200000, strengths:['Excelente orador','Contenido de neurociencias','Libros bestsellers'], weaknesses:['Enfoque muy amplio','Menos activo en redes','Precio premium'], content:'Conferencias, clips de charlas, tips de neuroventas.', tone:'Académico accesible, revelador', pricing:'Cursos desde $497' } ], matrix:[ {factor:'Autenticidad',pg:5,comp1:2,comp2:4,comp3:0}, {factor:'Contenido práctico',pg:5,comp1:3,comp2:3,comp3:0}, {factor:'Audiencia',pg:1,comp1:5,comp2:4,comp3:0}, {factor:'Producción',pg:2,comp1:5,comp2:4,comp3:0} ], insights:[ {type:'oportunidad',text:'El formato "storytime emprendedor" funciona muy bien y Pierre tiene historias reales.'}, {type:'oportunidad',text:'TikTok Latam está hambriento de contenido de negocios genuino.'}, {type:'insight',text:'Los videos de errores de emprendimiento generan más engagement que los de éxito.'} ], opportunities:['Storytime emprendedor en TikTok','Podcast corto en Spotify','Comunidad de emprendedores','Lanzamiento curso con lista de espera'], threats:['Saturación del nicho','Comparación con gurús existentes'] },
            strategy:{ status:'En revisión', lastUpdate:'2026-04-10', summary:'Construir la marca personal de Pierre como el mentor de negocios #1 del Perú basado en experiencia real. Estrategia de crecimiento rápido en video vertical + lanzamiento de curso online.', objective:'100K seguidores IG + lista de 5K emails en 6 meses.', positioning:'El mentor de negocios que dice lo que otros no se atreven.', pillars:['Sistemas de negocio','Mentalidad empresarial','Errores y aprendizajes','Framework Escala en 90 Días'], audiences:[ {name:'Emprendedor activo',desc:'28-40, tiene negocio, quiere escalar',channels:['Instagram','YouTube','LinkedIn']}, {name:'Aspirante',desc:'22-30, profesional, quiere emprender',channels:['TikTok','Instagram','YouTube']} ], campaigns:[], budget:{ meta:400, google:0, tiktok:200, produccion:500, total:1100 }, calendarMacro:[ {month:'Abril',focus:'Lanzar presencia TikTok e IG con batch de contenido',kpi:'5K seguidores nuevos'}, {month:'Mayo',focus:'Escalar producción + lista de espera curso',kpi:'15K seg + 1K emails'}, {month:'Junio',focus:'Pre-lanzamiento curso + colaboraciones',kpi:'30K seg + 3K emails'} ], risks:['Pierre no tenga tiempo para grabaciones','Audiencia no conecte con el tono'], nextSteps:['Grabar primer batch de 12 videos','Crear landing de lista de espera','Definir calendario editorial abril-mayo'] },
            content:{ calendar:[ { id:'c31', date:'2026-04-21', title:'Reel: Mi peor error como emprendedor', format:'Reel', channel:'Instagram', status:'Backlog', assignee:'ana', priority:'Alta' }, { id:'c32', date:'2026-04-22', title:'TikTok: 3 cosas que aprendí facturando $1M', format:'Video Vertical', channel:'TikTok', status:'Backlog', assignee:'ana', priority:'Alta' }, { id:'c33', date:'2026-04-23', title:'Carrusel: Framework Escala en 90 Días', format:'Carrusel', channel:'Instagram', status:'Backlog', assignee:'sofia', priority:'Media' }, { id:'c34', date:'2026-04-24', title:'Reel: Así manejo mi tiempo como CEO', format:'Reel', channel:'Instagram', status:'Backlog', assignee:'ana', priority:'Media' } ], copies:[ { id:'cp5', title:'Hooks batch 1 - Pierre', type:'Hooks', channel:'Instagram/TikTok', tone:'Directo', status:'En revisión', versions:[ { label:'Storytelling', text:'Con 25 años perdí $50,000 en un negocio que parecía perfecto. Te cuento qué pasó y cómo lo solucioné...' }, { label:'Polémico', text:'El 90% de los "cursos de negocios" son una estafa. Aquí te digo cómo identificar los buenos...' }, { label:'Educativo', text:'Si tu negocio no tiene estos 3 sistemas, estás trabajando DE MÁS. Te explico cuáles son...' } ] } ], community:[], approvals:[ {id:'ap8',piece:'Guiones Batch 1 Emprendimiento',format:'Guiones',date:'2026-04-11',status:'En revisión',clientNote:'Me gustan pero quiero que el #3 sea más personal, con la historia de mi primer negocio.',history:[{date:'2026-04-10',action:'Enviado'},{date:'2026-04-11',action:'Feedback de Pierre'}]} ] },
            tasks:[ { id:'t26', title:'Guiones Batch 1 (Emprendimiento)', desc:'8 guiones de video vertical sobre emprendimiento y negocios.', status:'En revisión', assignee:'ana', priority:'Alta', format:'Guiones', channel:'Instagram/TikTok', dueDate:'2026-04-18', subtasks:[{text:'4 storytelling',done:true},{text:'2 educativos',done:true},{text:'2 polémicos',done:true},{text:'Ajustes Pierre',done:false}], comments:[{author:'ana',text:'Listos los 8 guiones. Pierre pidió cambios en el #3.',date:'2026-04-11'}], tags:['Contenido','Urgente'] }, { id:'t27', title:'Línea gráfica para redes de Pierre', desc:'Definir tipografías, colores y plantillas para todas las redes.', status:'En proceso', assignee:'sofia', priority:'Alta', format:'Diseño', channel:'Todos', dueDate:'2026-04-17', subtasks:[{text:'Propuesta de colores',done:true},{text:'Templates stories',done:false},{text:'Templates carrusel',done:false}], comments:[], tags:['Diseño','Branding'] }, { id:'t28', title:'Landing page lista de espera curso', desc:'Crear landing simple para capturar emails del curso "Escala en 90 Días".', status:'Backlog', assignee:'sofia', priority:'Media', format:'Web', channel:'Email', dueDate:'2026-04-25', subtasks:[], comments:[], tags:['Web','Funnel'] }, { id:'t29', title:'Setup TikTok Business', desc:'Crear y optimizar perfil de TikTok de Pierre.', status:'Backlog', assignee:'diego', priority:'Media', format:'Setup', channel:'TikTok', dueDate:'2026-04-20', subtasks:[], comments:[], tags:['Setup'] } ],
            reports:{ current:{ period:'Marzo 2026', kpis:{ alcance:5200, interacciones:680, leads:0, cpl:0, seguidores:2800, publicaciones:4, engagement:3.2, clicks:320 }, vs_anterior:{alcance:0,interacciones:0,leads:0,cpl:0,seguidores:0,publicaciones:0,engagement:0,clicks:0}, topContent:[ {title:'Post: "Dejé mi trabajo para emprender"',views:3200,engagement:5.8,leads:0} ], worstContent:[], insights:['Pierre tiene engagement alto orgánico. Potencial para crecer rápido con consistencia.'], recommendations:['Iniciar producción de video vertical inmediatamente.','Configurar embudo de captación de emails.'], chartData:{ labels:['Oct','Nov','Dic','Ene','Feb','Mar'], seguidores:[1500,1600,1800,2000,2400,2800], alcance:[2000,2200,2500,3000,4000,5200], leads:[0,0,0,0,0,0] } } },
            settings:{ meetingFrequency:'Quincenal', meetingDay:'Viernes', meetingTime:'11:00', reportFrequency:'Mensual', reportDay:'Primera semana', teamAssigned:['luis','ana','sofia','carlos','diego'], integrations:[ {name:'Google Drive',status:'Conectado',icon:'hard-drive'}, {name:'Google Calendar',status:'Conectado',icon:'calendar'}, {name:'Instagram',status:'Conectado',icon:'instagram'}, {name:'TikTok Business',status:'Pendiente',icon:'music'} ], alerts:['Tarea vencida'], tags:['Marca Personal','Emprendimiento','Lanzamiento'] }
        },
        // ========== 6. VITALFIT STUDIO ==========
        {
            id:'vitalfit', name:'VitalFit Studio', industry:'Fitness y Bienestar', status:'Activo',
            progress:68, health:'good', owner:'valentina', logo:'VF', color:'bg-rose-600',
            contacts:[ { name:'Gabriela Torres', role:'Fundadora', email:'gabi@vitalfit.pe', phone:'+51 995 666 777', primary:true }, { name:'Marcos León', role:'Head Trainer', email:'marcos@vitalfit.pe', phone:'+51 996 888 999', primary:false } ],
            nextMeeting:{ date:'2026-04-17', time:'14:00', title:'Revisión quincenal + campaña de aniversario' },
            pendingTasks:10, reviewItems:2,
            onboarding:{ complete:100, steps:[ {id:1,title:'Datos',done:true,desc:''}, {id:2,title:'Contactos',done:true,desc:''}, {id:3,title:'Redes',done:true,desc:''}, {id:4,title:'BM',done:true,desc:''}, {id:5,title:'Marca',done:true,desc:''}, {id:6,title:'Kickoff',done:true,desc:''}, {id:7,title:'Objetivos',done:true,desc:''}, {id:8,title:'Tools',done:true,desc:''} ],
                data:{ razonSocial:'VitalFit Studio E.I.R.L.', ruc:'20345678901', direccion:'Av. Primavera 1240, Surco, Lima', web:'www.vitalfit.pe', instagram:'@vitalfitstudio', facebook:'VitalFit Studio', tiktok:'@vitalfitstudio', linkedin:'', youtube:'VitalFit Studio', objetivos:'200 membresías activas. Lanzar programa online. 20K seguidores IG.', propuestaValor:'Studio boutique de fitness funcional con enfoque holístico. Comunidad, no solo gimnasio.', tono:'Motivacional, cercano, energético pero no agresivo', buyerPersona:'Mujeres 25-45 que buscan un espacio fitness premium, motivador y comunitario.', competidores:'Bodytech, Smart Fit, F45 Training' } },
            brief:{ complete:80, lastUpdate:'2026-03-28', status:'Aprobado', negocio:'Studio boutique de fitness funcional en Surco. Clases grupales de máximo 20 personas con entrenadores certificados.', propuestaValor:'No somos un gimnasio. Somos una comunidad fitness. Entrenamiento personalizado en grupo, seguimiento nutricional y eventos mensuales.', servicios:'Clases funcionales, HIIT, Yoga, Nutrición, Programa online, Retiros wellness', publicoObjetivo:'Mujeres profesionales 25-45 en Lima Moderna que buscan transformar su estilo de vida con un enfoque holístico.', diferenciadores:'Comunidad sólida, atención personalizada, app de seguimiento, eventos sociales.', competencia:'Bodytech: Grande pero impersonal. Smart Fit: Económico pero sin comunidad.', objetivosComerciales:'200 membresías activas para Julio 2026.', objetivosMarketing:'20K seguidores IG. 50 leads/mes para prueba gratuita.', tono:'Energético, motivacional, cercano. Inspira sin presionar. Celebra el progreso, no solo los resultados.', restricciones:'No usar before/after extremos. No promover dietas restrictivas.', insights:'Las mujeres buscan comunidad y pertenencia, no solo ejercicio.', dolores:'Sentirse solas en el gym. No ver resultados. Falta de motivación. Rutinas aburridas.', mensajePrincipal:'Tu mejor versión empieza aquí, rodeada de personas increíbles.', ctaPrincipal:'Reserva tu clase gratis' },
            meetings:[ { id:'m14', date:'2026-04-17', time:'14:00', duration:'45 min', type:'Revisión quincenal', participants:['Gabriela Torres','Valentina Ruiz','Ana Martínez'], status:'Programada', summary:'', agreements:[], actionItems:[], recording:false }, { id:'m15', date:'2026-04-03', time:'14:00', duration:'50 min', type:'Revisión quincenal', participants:['Gabriela Torres','Marcos León','Valentina Ruiz','Ana Martínez'], status:'Completada', summary:'Se revisaron resultados de la campaña de Marzo. Gabi quiere preparar la campaña de aniversario (Mayo). Marcos propuso serie de videos de rutinas cortas para TikTok.', agreements:['Campaña aniversario en Mayo','Serie de rutinas TikTok','Shooting profesional para Abril'], actionItems:['Plan campaña aniversario - Valentina','Guiones rutinas - Ana','Cotización shooting - Miguel'], recording:true, tags:['Campaña','Aniversario'] } ],
            files:{ driveConnected:true, folders:[ { id:'f16', name:'01_Branding', icon:'palette', files:[ { id:'a36', name:'Logo_VitalFit.svg', type:'image', size:'110 KB', date:'2026-01-20', status:'Aprobado' } ] }, { id:'f17', name:'02_Contenido', icon:'video', files:[ { id:'a37', name:'Reel_Clase_Funcional.mp4', type:'video', size:'42 MB', date:'2026-04-05', status:'Aprobado' }, { id:'a38', name:'Fotos_Studio_Abril.zip', type:'archive', size:'85 MB', date:'2026-04-08', status:'Aprobado' } ] } ] },
            benchmark:{ status:'Completado', lastUpdate:'2026-03-15', overview:'El mercado fitness boutique está creciendo post-pandemia. La comunidad y la experiencia premium diferencian a los studios exitosos.', competitors:[ { name:'Bodytech', logo:'BT', web:'bodytech.pe', instagram:95000, tiktok:12000, facebook:120000, strengths:['Infraestructura','Marca reconocida','Múltiples sedes'], weaknesses:['Impersonal','Sin comunidad real','Contenido genérico'], content:'Promociones, tips genéricos, fotos de sedes.', tone:'Corporativo moderno', pricing:'Desde S/ 199/mes' }, { name:'F45 Training', logo:'F4', web:'f45training.pe', instagram:8500, tiktok:3000, facebook:4000, strengths:['Formato innovador','Internacional','Comunidad fuerte'], weaknesses:['Precio alto','Pocas sedes','Marketing agresivo'], content:'Transformaciones, clases, energía de grupo.', tone:'Energético, fitness extremo', pricing:'Desde S/ 350/mes' } ], matrix:[ {factor:'Comunidad',pg:5,comp1:2,comp2:4,comp3:0}, {factor:'Producto',pg:4,comp1:3,comp2:4,comp3:0}, {factor:'Precio',pg:3,comp1:4,comp2:2,comp3:0}, {factor:'Digital',pg:3,comp1:4,comp2:3,comp3:0} ], insights:[ {type:'oportunidad',text:'El contenido de "día en el studio" y transformaciones reales genera altísimo engagement.'}, {type:'insight',text:'Las plataformas priorizan video. Los studios que graban clases crecen más rápido.'} ], opportunities:['Serie de transformaciones reales','Colaboraciones con nutricionistas','Programa online para captar audiencia fuera de Lima'], threats:['Cadenas grandes bajan precios','Nuevos studios boutique en la zona'] },
            strategy:{ status:'Aprobada', lastUpdate:'2026-03-20', summary:'Crecer la comunidad de VitalFit a través de contenido auténtico de transformación y experiencia. Convertir seguidores en miembros con embudo de clase gratuita.', objective:'200 membresías activas y 20K seguidores IG para Julio 2026.', positioning:'El studio fitness donde haces amigas mientras transformas tu vida.', pillars:['Transformaciones reales','Vida en el studio','Tips de bienestar','Comunidad y eventos'], audiences:[ {name:'Mujer activa',desc:'25-35, profesional, busca comunidad fitness',channels:['Instagram','TikTok']}, {name:'Mamá fit',desc:'35-45, busca retomar actividad física',channels:['Instagram','Facebook']} ], campaigns:[ {name:'Clase Gratis',type:'Conversión',channel:'Meta Ads',budget:400,status:'Activa',leads:45,cpa:8.89} ], budget:{ meta:400, google:0, tiktok:150, produccion:250, total:800 }, calendarMacro:[ {month:'Abril',focus:'Serie rutinas TikTok + Shooting profesional',kpi:'40 leads'}, {month:'Mayo',focus:'Campaña aniversario + Evento abierto',kpi:'60 leads'} ], risks:['Estacionalidad fitness (baja en invierno)'], nextSteps:['Grabar serie rutinas cortas','Planificar evento aniversario','Shooting profesional del studio'] },
            content:{ calendar:[ { id:'c41', date:'2026-04-14', title:'Reel: Clase funcional en cámara rápida', format:'Reel', channel:'Instagram', status:'Publicado', assignee:'valentina', priority:'Alta' }, { id:'c42', date:'2026-04-16', title:'TikTok: Rutina 5 min glúteos', format:'Video Vertical', channel:'TikTok', status:'Programado', assignee:'ana', priority:'Alta' }, { id:'c43', date:'2026-04-18', title:'Carrusel: 5 beneficios del entrenamiento funcional', format:'Carrusel', channel:'Instagram', status:'En proceso', assignee:'sofia', priority:'Media' }, { id:'c44', date:'2026-04-21', title:'Story: Día en VitalFit', format:'Story', channel:'Instagram', status:'Backlog', assignee:'valentina', priority:'Baja' } ], copies:[], community:[ {id:'cm8',from:'@fiitgirl_lima',channel:'Instagram',type:'Consulta',message:'¿Tienen clases para principiantes? Nunca he hecho funcional 😅',date:'2026-04-13',urgency:'alta',suggestedReply:'¡Claro que sí! Todas nuestras clases se adaptan a tu nivel. Tenemos una clase de prueba GRATIS para que pruebes sin compromiso. ¿Te animas esta semana? 💪',status:'Pendiente'} ], approvals:[ {id:'ap9',piece:'Carrusel beneficios funcional',format:'Carrusel',date:'2026-04-12',status:'En revisión',clientNote:'',history:[{date:'2026-04-12',action:'Enviado'}]} ] },
            tasks:[ { id:'t30', title:'Serie rutinas cortas TikTok (5 videos)', desc:'Grabar y editar 5 rutinas de 30-60 segundos para TikTok.', status:'En proceso', assignee:'miguel', priority:'Alta', format:'Video Vertical', channel:'TikTok', dueDate:'2026-04-20', subtasks:[{text:'Definir rutinas con Marcos',done:true},{text:'Grabar en studio',done:false},{text:'Editar 5 videos',done:false}], comments:[], tags:['TikTok','Video'] }, { id:'t31', title:'Plan campaña aniversario mayo', desc:'Definir mecánica, creatividades y presupuesto para el aniversario.', status:'Backlog', assignee:'valentina', priority:'Alta', format:'Campaña', channel:'Todos', dueDate:'2026-04-22', subtasks:[], comments:[], tags:['Campaña','Aniversario'] }, { id:'t32', title:'Shooting profesional studio', desc:'Coordinar sesión de fotos profesionales del studio, equipo y clases.', status:'Backlog', assignee:'miguel', priority:'Media', format:'Fotografía', channel:'Todos', dueDate:'2026-04-25', subtasks:[], comments:[], tags:['Foto','Producción'] } ],
            reports:{ current:{ period:'Marzo 2026', kpis:{ alcance:28000, interacciones:3800, leads:45, cpl:8.89, seguidores:9200, publicaciones:20, engagement:5.8, clicks:1200 }, vs_anterior:{alcance:18,interacciones:25,leads:15,cpl:-5,seguidores:22,publicaciones:8,engagement:0.6,clicks:20}, topContent:[ {title:'Reel: Transformación de Claudia (3 meses)',views:18000,engagement:9.5,leads:12}, {title:'TikTok: Rutina sin equipos',views:12000,engagement:7.2,leads:5} ], worstContent:[], insights:['Las transformaciones reales son el contenido más efectivo.','El horario post-laboral (6-8pm) tiene mejor engagement.'], recommendations:['Más contenido de transformaciones.','Incorporar testimonios en video.'], chartData:{ labels:['Oct','Nov','Dic','Ene','Feb','Mar'], seguidores:[4200,5000,5800,6800,7500,9200], alcance:[12000,15000,18000,20000,24000,28000], leads:[15,20,25,30,38,45] } } },
            settings:{ meetingFrequency:'Quincenal', meetingDay:'Jueves', meetingTime:'14:00', reportFrequency:'Mensual', reportDay:'Primera semana', teamAssigned:['valentina','ana','sofia','miguel'], integrations:[ {name:'Google Drive',status:'Conectado',icon:'hard-drive'}, {name:'Google Calendar',status:'Conectado',icon:'calendar'}, {name:'Meta Business Suite',status:'Conectado',icon:'facebook'}, {name:'Instagram',status:'Conectado',icon:'instagram'} ], alerts:['Lead sin atender > 12hrs'], tags:['Fitness','Comunidad','Boutique'] }
        },
        // ========== 7. DELIZIA GOURMET ==========
        {
            id:'delizia', name:'Delizia Gourmet', industry:'Gastronomía Premium', status:'Pausado',
            progress:45, health:'danger', owner:'carlos', logo:'DG', color:'bg-amber-700',
            contacts:[ { name:'Chef Antonio Paredes', role:'Fundador / Chef Principal', email:'antonio@delizia.pe', phone:'+51 991 444 555', primary:true }, { name:'Lucía Mendoza', role:'Administradora', email:'lucia@delizia.pe', phone:'+51 992 666 777', primary:false } ],
            nextMeeting:{ date:'2026-04-22', time:'16:00', title:'Reunión de reactivación' },
            pendingTasks:5, reviewItems:0,
            onboarding:{ complete:100, steps:[ {id:1,title:'Datos',done:true,desc:''}, {id:2,title:'Contactos',done:true,desc:''}, {id:3,title:'Redes',done:true,desc:''}, {id:4,title:'BM',done:true,desc:''}, {id:5,title:'Marca',done:true,desc:''}, {id:6,title:'Kickoff',done:true,desc:''}, {id:7,title:'Objetivos',done:true,desc:''}, {id:8,title:'Tools',done:true,desc:''} ],
                data:{ razonSocial:'Delizia Gourmet S.A.C.', ruc:'20789456123', direccion:'Calle Manuel Bonilla 140, Miraflores, Lima', web:'www.delizia.pe', instagram:'@deliziagourmet', facebook:'Delizia Gourmet', tiktok:'', linkedin:'', youtube:'', objetivos:'Llenar reservaciones de jueves a domingo. Posicionar en el top gastronómico de Lima.', propuestaValor:'Cocina de autor que fusiona tradición peruana con técnica francesa. Experiencia gastronómica completa.', tono:'Sofisticado, premium, sensorial', buyerPersona:'Parejas y grupos de amigos 30-50, NSE A-B, foodies que buscan experiencias gastronómicas únicas.', competidores:'Maido, Central, Isolina' } },
            brief:{ complete:70, lastUpdate:'2026-03-01', status:'Pausado', negocio:'Restaurante de cocina de autor en Miraflores. Fusión peruana-francesa con ingredientes locales de temporada.', propuestaValor:'Experiencia gastronómica de 7 tiempos que cuenta la historia de los ingredientes peruanos con técnica francesa.', servicios:'Cena degustación, Menú ejecutivo, Eventos privados, Catering premium', publicoObjetivo:'Foodies exigentes 30-50, NSE A, Lima Moderna. Turistas gastronómicos.', diferenciadores:'Chef con formación en Le Cordon Bleu, ingredientes de productores locales, experiencia de cena inmersiva.', competencia:'', objetivosComerciales:'90% ocupación jue-dom. Ticket promedio S/ 180.', objetivosMarketing:'5K seguidores IG. Aparecer en rankings gastronómicos.', tono:'Sofisticado y sensorial. Evita el hype. Deja que la comida hable.', restricciones:'Todas las fotos deben ser profesionales. No publicar platos sin estilismo.', insights:'', dolores:'', mensajePrincipal:'Cada plato cuenta una historia.', ctaPrincipal:'Reserva tu mesa' },
            meetings:[ { id:'m16', date:'2026-04-22', time:'16:00', duration:'60 min', type:'Reactivación', participants:['Antonio Paredes','Lucía Mendoza','Carlos Vega','Luis Rodríguez'], status:'Programada', summary:'', agreements:[], actionItems:[], recording:false }, { id:'m17', date:'2026-03-10', time:'16:00', duration:'45 min', type:'Revisión', participants:['Antonio Paredes','Carlos Vega'], status:'Completada', summary:'Antonio mencionó que necesita pausar el servicio por remodelación del restaurante durante abril. Se acordó pausar campañas y retomar en mayo con relanzamiento.', agreements:['Pausar campañas en abril','Producir contenido de remodelación','Relanzamiento en mayo'], actionItems:['Pausar ads - Diego','Planificar relanzamiento - Luis','Fotos de remodelación - Miguel'], recording:false, tags:['Pausa','Remodelación'] } ],
            files:{ driveConnected:false, folders:[ { id:'f18', name:'01_Branding', icon:'palette', files:[ { id:'a39', name:'Logo_Delizia.svg', type:'image', size:'200 KB', date:'2026-01-15', status:'Aprobado' } ] }, { id:'f19', name:'02_Fotografía', icon:'image', files:[ { id:'a40', name:'Platos_Sesion_Enero.zip', type:'archive', size:'250 MB', date:'2026-01-20', status:'Aprobado' } ] } ] },
            benchmark:{ status:'Completado', lastUpdate:'2026-02-15', overview:'Lima es capital gastronómica mundial. La competencia es feroz pero hay espacio para restaurants de autor con buena estrategia digital.', competitors:[ { name:'Isolina', logo:'IS', web:'isolina.pe', instagram:85000, tiktok:25000, facebook:45000, strengths:['Marca muy querida','Contenido auténtico','Alta calidad'], weaknesses:['Precios altos','Espera larga para reservas'], content:'Fotos de platos icónicos, behind the scenes de cocina.', tone:'Cálido, peruano, hogareño', pricing:'Ticket promedio S/ 120' } ], matrix:[ {factor:'Producto',pg:5,comp1:5,comp2:0,comp3:0}, {factor:'Digital',pg:2,comp1:4,comp2:0,comp3:0}, {factor:'Marca',pg:2,comp1:5,comp2:0,comp3:0} ], insights:[ {type:'oportunidad',text:'El contenido "behind the scenes de cocina" tiene alto engagement en gastronomía.'} ], opportunities:['Contenido de proceso y técnica culinaria','Colaboración con food bloggers'], threats:['Nuevos restaurantes de autor en la zona'] },
            strategy:{ status:'Pausada', lastUpdate:'2026-03-10', summary:'Posicionar Delizia como experiencia gastronómica imperdible en Miraflores. Estrategia pausada durante remodelación (abril).', objective:'5K seguidores IG y 90% ocupación para Agosto 2026.', positioning:'Donde la cocina peruana se encuentra con la técnica francesa.', pillars:['Platos y experiencia','Chef y equipo','Ingredientes y productores','Eventos especiales'], audiences:[ {name:'Foodie limeño',desc:'30-50, NSE A, busca experiencias nuevas',channels:['Instagram']} ], campaigns:[], budget:{ meta:200, google:100, tiktok:0, produccion:300, total:600 }, calendarMacro:[ {month:'Mayo',focus:'Relanzamiento post-remodelación',kpi:'Llenar semana 1'}, {month:'Junio',focus:'Contenido de nueva experiencia',kpi:'3K seguidores'} ], risks:['Remodelación se extiende','Chef pierde motivación digital'], nextSteps:['Documentar remodelación','Planificar evento de relanzamiento','Sesión fotográfica del restaurante nuevo'] },
            content:{ calendar:[], copies:[], community:[], approvals:[] },
            tasks:[ { id:'t33', title:'Documentar remodelación en fotos/video', desc:'Capturar proceso de remodelación para contenido de relanzamiento.', status:'En proceso', assignee:'miguel', priority:'Media', format:'Foto/Video', channel:'Instagram', dueDate:'2026-04-30', subtasks:[], comments:[], tags:['Remodelación'] }, { id:'t34', title:'Planificar evento de relanzamiento', desc:'Definir concepto, invitados e influencers para evento de reapertura.', status:'Backlog', assignee:'carlos', priority:'Media', format:'Evento', channel:'Todos', dueDate:'2026-04-28', subtasks:[], comments:[], tags:['Evento','Relanzamiento'] } ],
            reports:{ current:{ period:'Marzo 2026', kpis:{ alcance:8500, interacciones:1200, leads:15, cpl:13.33, seguidores:3200, publicaciones:8, engagement:4.5, clicks:380 }, vs_anterior:{alcance:-15,interacciones:-20,leads:-30,cpl:25,seguidores:5,publicaciones:-40,engagement:-0.5,clicks:-18}, topContent:[ {title:'Foto: Nuevo menú degustación',views:4500,engagement:6.2,leads:5} ], worstContent:[], insights:['Actividad reducida por pausa. Métricas en descenso.'], recommendations:['Reactivar con fuerza en Mayo con relanzamiento.'], chartData:{ labels:['Oct','Nov','Dic','Ene','Feb','Mar'], seguidores:[2000,2200,2500,2800,3000,3200], alcance:[5000,6000,8000,10000,10000,8500], leads:[5,8,10,15,20,15] } } },
            settings:{ meetingFrequency:'Mensual', meetingDay:'Martes', meetingTime:'16:00', reportFrequency:'Mensual', reportDay:'Primera semana', teamAssigned:['carlos','miguel','luis'], integrations:[ {name:'Google Drive',status:'Pendiente',icon:'hard-drive'}, {name:'Google Calendar',status:'Conectado',icon:'calendar'}, {name:'Instagram',status:'Conectado',icon:'instagram'} ], alerts:[], tags:['Gastronomía','Premium','Pausado'] }
        }
    ]
};
