import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import CustomCursor from "./components/CustomCursor";
import HeroSection from "./sections/HeroSection";
// import ManifestoSection from "./sections/ManifestoSection";
// import SelectedWorkSection from "./sections/SelectedWorkSection";
// import TerminalInput from "./sections/TerminalInput";

gsap.registerPlugin(ScrollTrigger);

function App() {
	// const lenisRef = useRef<Lenis | null>(null);

	// useEffect(() => {
	// 	// Initialize Lenis smooth scroll
	// 	const lenis = new Lenis({
	// 		lerp: 0.05,
	// 		smoothWheel: true,
	// 	});
	// 	lenisRef.current = lenis;

	// 	// Connect Lenis to GSAP ScrollTrigger
	// 	lenis.on("scroll", ScrollTrigger.update);

	// 	gsap.ticker.add((time) => {
	// 		lenis.raf(time * 1000);
	// 	});
	// 	gsap.ticker.lagSmoothing(0);

	// 	return () => {
	// 		lenis.destroy();
	// 		gsap.ticker.remove(lenis.raf);
	// 	};
	// }, []);

	return (
		<div style={{ backgroundColor: "#000000", minHeight: "100vh" }}>
			{/* <CustomCursor /> */}

			<main>
				<HeroSection />
				{/* <ManifestoSection /> */}
				{/* <SelectedWorkSection /> */}
				{/* <TerminalInput /> */}
			</main>

			{/* Footer */}
			<footer
				className='relative px-10 md:px-16 lg:px-20 py-10'
				style={{
					backgroundColor: "#000000",
					borderTop: "1px solid #333333",
					zIndex: 10,
				}}>
				<div className='flex flex-col md:flex-row items-center justify-between gap-4'>
					<span
						className='font-mono text-xs uppercase tracking-widest'
						style={{ color: "#666666" }}>
						F2Z / GITHUB.IO
					</span>
					<div className='flex gap-8'>
						<a
							href='https://github.com/Fi2zz'
							target='_blank'
							rel='noopener noreferrer'
							className='font-mono text-xs uppercase tracking-widest transition-colors duration-300 hover:text-white'
							style={{ color: "#666666" }}
							data-hover>
							GitHub
						</a>
						<a
							href='mailto:a125ab9527cdfe@gmail.com'
							className='font-mono text-xs uppercase tracking-widest transition-colors duration-300 hover:text-white'
							style={{ color: "#666666" }}
							data-hover>
							Email
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default App;
