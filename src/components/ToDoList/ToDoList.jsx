import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Check, Edit3, Moon, Sun, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import SimpleTooltip from "../tooltip-provider";
import { useState } from "react";

export function TodoList() {
  const { theme, setTheme } = useTheme();
  const [toDoList, setToDoList] = useState([]);
  const [copyToDoList, setCopyToDoList] = useState([]);
  const toDoObj = {
    toDoId: toDoList.length,
    isChecked: false,
    toDoItem: "",
  };
  const [initialToDoObject, setInitialToDoObject] = useState(toDoObj);

  function changeThemeHandler() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  function inputChangeHandler(e) {
    const { name, value } = e.target;

    setInitialToDoObject((prev) => ({ ...prev, [name]: value }));
  }

  function saveToDoListHandler() {
    setToDoList((prev) => [
      ...prev,
      { ...initialToDoObject, toDoId: toDoList.length + 1 },
    ]);
    setCopyToDoList((prev) => [
      ...prev,
      { ...initialToDoObject, toDoId: toDoList.length + 1 },
    ]);
    setInitialToDoObject(toDoObj);
  }

  function editToDoItemHandler(e, id) {
    setToDoList((prev) =>
      prev.map((l) =>
        l.toDoId === id ? { ...l, toDoItem: e.target.value } : l
      )
    );
    setCopyToDoList((prev) =>
      prev.map((l) =>
        l.toDoId === id ? { ...l, toDoItem: e.target.value } : l
      )
    );
  }

  return (
    <div className="max-w-[600px] m-auto p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl tracking-[1rem] font-medium">TODO</h2>
        <Button onClick={changeThemeHandler}>
          {theme === "dark" ? <Moon /> : <Sun />}
        </Button>
      </div>

      <div className="flex items-center gap-1 p-2.5 px-6 rounded mt-15 mb-10 bg-gray-300 dark:bg-gray-900">
        <Checkbox
          name="isChecked"
          className="rounded-full w-5 h-5 bg-white border border-gray-400"
          checked={initialToDoObject.isChecked}
          onCheckedChange={(e) =>
            setInitialToDoObject((prev) => ({ ...prev, isChecked: e }))
          }
        />
        <Input
          placeholder="Create a new todo..."
          className="outline-none border-none shadow-none focus-visible:ring-0 dark:bg-transparent text-[16px]"
          name="toDoItem"
          value={initialToDoObject.toDoItem}
          onChange={inputChangeHandler}
        />
        {initialToDoObject.toDoItem != "" && (
          <SimpleTooltip text="Add to list">
            <Button
              className="rounded-full cursor-pointer"
              variant="outline"
              onClick={saveToDoListHandler}
            >
              <Check />
            </Button>
          </SimpleTooltip>
        )}
      </div>

      <div className="bg-gray-300 dark:bg-gray-900 rounded">
        <div>
          {toDoList?.map((l, i) => (
            <div
              key={i}
              className="flex items-center gap-1 p-2.5 px-6 border-b bg-gray-300 dark:bg-gray-900"
            >
              <Checkbox
                className="rounded-full w-5 h-5 bg-white border border-gray-400"
                checked={l.isChecked}
                onCheckedChange={(e) => {
                  setToDoList((prev) =>
                    prev.map((m) =>
                      m.toDoId === l.toDoId ? { ...m, isChecked: e } : m
                    )
                  );
                  setCopyToDoList((prev) =>
                    prev.map((m) =>
                      m.toDoId === l.toDoId ? { ...m, isChecked: e } : m
                    )
                  );
                }}
              />
              <Input
                className={`outline-none border-none shadow-none focus-visible:ring-0 dark:bg-transparent text-[16px] ${
                  l.isChecked && "line-through text-gray-500"
                }`}
                value={l.toDoItem}
                onChange={(e) => editToDoItemHandler(e, l.toDoId)}
              />
              <Button
                className="border-none cursor-pointer text-red-600 hover:text-red-600 dark:hover:bg-transparent dark:bg-transparent"
                variant="outline"
                onClick={() => {
                  setToDoList((prev) =>
                    prev.filter((d) => d.toDoId != l.toDoId)
                  );
                  setCopyToDoList((prev) =>
                    prev.filter((d) => d.toDoId != l.toDoId)
                  );
                }}
              >
                <Trash2 />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between p-2.5 px-6">
          <div>
            <p className="text-sm">{toDoList.length} items left</p>
          </div>
          <div className="hidden sm:block">
            <TabsList copyToDoList={copyToDoList} setToDoList={setToDoList} />
          </div>
          <div>
            <Button
              variant="outline"
              className="px-2.5 border-none dark:bg-transparent dark:hover:bg-transparent shadow-none cursor-pointer hover:text-blue-400"
              onClick={() =>
                setToDoList((prev) => prev.filter((l) => !l.isChecked))
              }
            >
              Clear Completed
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-5 p-2.5 bg-gray-300 dark:bg-gray-900 rounded sm:hidden">
        <TabsList copyToDoList={copyToDoList} setToDoList={setToDoList} />
      </div>
    </div>
  );
}

function TabsList({ copyToDoList, setToDoList }) {
  const [currentTab, setCurrentTab] = useState("All");
  function filterListHandler(category) {
    setCurrentTab(category);
    const updatedList =
      category === "Active"
        ? copyToDoList.filter((l) => !l.isChecked)
        : category === "Completed"
        ? copyToDoList.filter((l) => l.isChecked)
        : [...copyToDoList]; // <-- ensures re-render

    setToDoList(updatedList);
  }

  return (
    <ButtonGroup className="flex justify-center w-full">
      {["All", "Active", "Completed"].map((s, i) => (
        <Button
          key={i}
          variant="outline"
          className={`px-2.5 border-none dark:bg-transparent dark:hover:bg-transparent shadow-none cursor-pointer hover:text-none ${
            currentTab === s && "text-blue-400"
          }`}
          onClick={() => filterListHandler(s)}
        >
          {s}
        </Button>
      ))}
    </ButtonGroup>
  );
}
