import { NavLink } from 'react-router';

const DetailPage = () => {
  return (
    <div className="p-6">
      <div className="flex justify-end">
        <NavLink
          to={'/'}
          className="px-6 py-2 bg-indigo-500 text-white rounded active:bg-indigo-600 hover:bg-indigo-700 transition-colors ml-auto"
        >
          Close
        </NavLink>
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
        dolorum rem illum natus. Nobis dolore et tempore aspernatur similique
        dicta vel culpa magni? Harum accusamus beatae nostrum nemo eligendi
        velit itaque ipsam nulla quod repudiandae voluptas, sed quibusdam
        distinctio! Placeat voluptatibus sint unde laboriosam ipsa perferendis
        repudiandae tempore sapiente, vitae repellendus optio culpa nulla.
        Explicabo nostrum nobis ducimus aliquam asperiores numquam maxime, atque
        corrupti reprehenderit nam quisquam sed dolor, doloremque ratione? Enim
        consequatur voluptatibus temporibus error. Corporis deserunt ratione
        quibusdam molestiae asperiores distinctio necessitatibus quisquam qui ad
        adipisci, magni eius velit temporibus, eligendi assumenda reprehenderit,
        iusto ea rem sed aliquam.
      </div>
    </div>
  );
};

export default DetailPage;
