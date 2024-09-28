import React, { useEffect } from "react";
import {
  FaChurch,
  FaBuilding,
  FaUsers,
  FaGlobe,
  FaVideo,
} from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const eventos = [
  {
    año: "2019",
    descripcion: "Fundación de la iglesia",
    icon: FaChurch,
    izquierda: "2 miembros fundadores",
    derecha: "Primera reunión de la iglesia",
    detalles:
      "La iglesia comenzó con dos creyentes comprometidos que se reunían en hogares para estudiar la Biblia y orar juntos.",
  },
  {
    año: "2022",
    descripcion: "Primer bautismo de la iglesia",
    icon: FaUsers,
    izquierda: "7 miembros bautizados",
    derecha: "Bautizos en la iglesia",
    detalles:
      "Reconociendo la importancia de dar el siguiente paso en el Señor, siete miembros de la iglesia decidieron dar este gran paso y se realizó por primera vez el bautismo de inmersión, para darle toda la gloria y honra a Dios.",
  },
  {
    año: "2024",
    descripcion: "Construcción del nuevo templo",
    icon: FaBuilding,
    izquierda: "Capacidad para 250 personas",
    derecha: "Inversión de $300,000 dolares",
    detalles:
      "Gracias a las ayudas de las iglesias bautistas de Estados Unidos y su gran generosidad, logramos la construcción de nuestro templo para Dios.",
  },
];

const LineaVertical = () => (
  <>
    <motion.div
      className="absolute left-1/2 transform -translate-x-1/2 w-0 border-l-2 border-dashed border-[#422874]"
      initial={{ height: 0 }}
      animate={{ height: "10%" }}
      transition={{ duration: 0.5 }}
    />
    <motion.div
      className="absolute left-1/2 transform -translate-x-1/2 w-0 border-l-2 border-solid border-[#422874]"
      initial={{ height: 0, top: "10%" }}
      animate={{ height: "80%" }}
      transition={{ duration: 1, delay: 0.5 }}
    />
    <motion.div
      className="absolute left-1/2 transform -translate-x-1/2 w-0 border-l-2 border-dashed border-[#422874]"
      initial={{ height: 0, top: "90%" }}
      animate={{ height: "10%" }}
      transition={{ duration: 0.5, delay: 1.5 }}
    />
  </>
);

const AnimatedCircle = ({ icon: Icon, index }: any) => {
  const controls = useAnimation();

  useEffect(() => {
    const animateCircle = async () => {
      await new Promise((resolve) => setTimeout(resolve, index * 8000));
      while (true) {
        await controls.start({
          scale: [1, 1.2, 1],
          transition: { duration: 3 },
        });
        await new Promise((resolve) => setTimeout(resolve, 8000));
      }
    };
    animateCircle();
  }, [controls, index]);

  return (
    <motion.div
      className="w-12 h-12 bg-white border-4 border-[#422874] rounded-full flex items-center justify-center cursor-pointer"
      animate={controls}
    >
      <Icon className="text-[#422874] text-2xl" />
    </motion.div>
  );
};

const TimeLine = () => {
  return (
    <div className="mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-[#422874]">
        Nuestra Historia
      </h2>
      <div className="relative">
        <LineaVertical />
        {eventos.map((evento, index) => (
          <motion.div
            key={index}
            className="mb-16 flex items-center w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="w-5/12 text-right pr-8">
              <div className="text-base font-bold text-primary/85">
                {evento.izquierda}
              </div>
              {index % 2 === 0 && (
                <>
                  <div className="text-4xl font-bold text-[#422874] mt-2">
                    {evento.año}
                  </div>
                  <div className="mt-1 text-lg text-gray-700">
                    {evento.descripcion}
                  </div>
                </>
              )}
            </div>
            <div className="w-2/12 flex justify-center relative">
              <Popover>
                <PopoverTrigger>
                  <AnimatedCircle icon={evento.icon} index={index} />
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4 relative z-30 transform translate-y-2 shadow-lg rounded-lg bg-white">
                  <h3 className="text-lg font-semibold text-[#422874] mb-2">
                    {evento.año} - {evento.descripcion}
                  </h3>
                  <p className="text-sm text-gray-700">{evento.detalles}</p>
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-5/12 pl-8">
              <div className="text-base font-bold text-primary/85">
                {evento.derecha}
              </div>
              {index % 2 !== 0 && (
                <>
                  <div className="text-4xl font-bold text-[#422874] mt-2">
                    {evento.año}
                  </div>
                  <div className="mt-1 text-lg text-gray-700">
                    {evento.descripcion}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TimeLine;
