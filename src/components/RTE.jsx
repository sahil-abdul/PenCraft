import { Editor } from "@tinymce/tinymce-react";
import config from "../config/config";
import { useId } from "react";
import { Controller } from "react-hook-form";

function RTE({ name, label, control, defaultValue = "" }) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}

      <Controller
        name={name || "container"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={config.tinyapikey}
            initialValue={defaultValue}
            init={{
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body {font-family:helvetica,Arial,sans-serif,font-style:14px}",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
