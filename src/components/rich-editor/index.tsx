import { FC, useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import clsx from "clsx";
import Tools from "./Tools";

interface Props {
  value?: string;
  onChange?(html: string): void;
  editable?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  placeholder?: string;
}

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      HTMLAttributes: {
        class: "tiptap-ul",
      },
    },
    orderedList: {
      keepMarks: true,
      HTMLAttributes: {
        class: "tiptap-ol",
      },
    },
  }),
];

let loaded = false;

const RichEditor: FC<Props> = ({
  editable,
  placeholder,
  isInvalid,
  errorMessage,
  value,
  onChange,
}) => {
  const editor = useEditor({
    extensions: [...extensions, Placeholder.configure({ placeholder })],
    onUpdate({ editor }) {
      onChange && onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (loaded) return;
    if (editor && !editable) {
      editor.setEditable(false);
    }
    if (editor && value) {
      editor?.commands.setContent(value);
      loaded = true;
    }
  }, [editor, value, editable]);

  return (
    <>
      <div
        className={clsx(
          isInvalid && " ring-2 p-2 ring-red-400 rounded-medium"
        )}>
        <Tools editor={editor} visible={editable} />
        <EditorContent editor={editor} />
        {errorMessage ? (
          <p className=" text-xs text-red-400">{errorMessage}</p>
        ) : null}
      </div>
    </>
  );
};

export default RichEditor;
