
interface ITextInput {
  name: string;
  id: string;
  placeholder: string;
}

export default function TextInput({ name, id, placeholder }: ITextInput) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        { name }
      </label>
      <input
        type="text"
        name={ name }
        id={ id }
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
        placeholder={ placeholder }
        required
      />
    </div>
  );
}
