import { useEffect, useState } from "react";
import { levelLoadOptions } from "../../../src/lib/selectoptions";
import Button from "../../Button";
import Label from "../../Label";
import AsyncSelect from "react-select/async";
import InputError from "../../InputError";
import Input from "../../Input";
import axios from "../../../src/lib/axios";
import { useGroup } from "../../../src/hooks/group";

const AddGroup = ({ onClick }) => {
    const { generateGroups, loading } = useGroup();
    const [level, setLevel] = useState("");
    const [name, setName] = useState("");
    const [noOfGroup, setNoOfGroup] = useState("");
    const [levelData, setLevelData] = useState(null);

    const [errors, setErrors] = useState([]);
    const [errs, setErrs] = useState(false);
    const [status, setStatus] = useState(null);

    const getCapacity = () => {
        if (level) {
            const data = levelData.filter(item => item.id === level);
            return data[0]?.students_count;
        } else {
            return 0;
        }
    };
    const fetchLevels = async () => {
        const response = await axios.get("api/v1/levels");
        response.status === 200 && setLevelData(response.data.data);
    };
    useEffect(() => {
        fetchLevels();
    }, []);

    const submitForm = event => {
        event.preventDefault();
        if (noOfGroup > getCapacity()) {
            setErrs(true);
        } else {
            setErrs(false);
            generateGroups({
                level,
                name,
                no_of_group: noOfGroup,
                setErrors,
                setStatus,
            });
        }
    };
    return (
        <form
            onSubmit={submitForm}
            className="-ml-2"
            encType="multipart/form-data">
            <div className="flex items-center justify-between border-b px-8 py-4 ">
                <h4 className="text-2xl font-bold text-black-text">
                    Create Groupings
                </h4>
                <div className="space-x-4">
                    <Button
                        onClick={onClick}
                        className="!capitalize !rounded-full !px-8"
                        danger>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="!capitalize !rounded-full !px-8"
                        loader={loading}>
                        Submit
                    </Button>
                </div>
            </div>

            <div className="pb-10">
                <div className="py-6 px-8 pr-10 space-y-5">
                    {errs && (
                        <p className="bg-red-200 text-red-600 text-sm px-2 py-1 rounded-sm">
                            Number of groups can't be greater then student
                            capacity
                        </p>
                    )}
                    <div className="">
                        <Label htmlFor="name">Group Name</Label>
                        <Input
                            type="text"
                            id="name"
                            value={name}
                            onChange={event => setName(event.target.value)}
                            className="block mt-1 w-full"
                            required
                        />
                        <InputError messages={errors.name} className="mt-1" />
                    </div>
                    <div className="">
                        <Label htmlFor="level">Level (Class)</Label>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={levelLoadOptions}
                            defaultOptions
                            className="block mt-1 w-full"
                            onChange={event => {
                                setLevel(event.value);
                            }}
                            required
                        />
                        {level === "" && (
                            <input
                                tabIndex={-1}
                                autoComplete="off"
                                style={{
                                    position: "absolute",
                                    opacity: 0,
                                    width: "100%",
                                }}
                                required
                            />
                        )}
                        <InputError messages={errors.level} className="mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="">
                            <Label htmlFor="noOfGroup">Student Capcity</Label>
                            <Input
                                type="text"
                                id="noOfGroup"
                                value={getCapacity()}
                                className="block mt-1 w-full disabled:bg-primary-accent"
                                disabled={true}
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="noOfGroup">Number of Group</Label>
                            <Input
                                type="text"
                                id="noOfGroup"
                                value={noOfGroup}
                                onChange={event =>
                                    setNoOfGroup(event.target.value)
                                }
                                className="block mt-1 w-full"
                                required
                            />
                            <InputError
                                messages={errors.no_of_group}
                                className="mt-1"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddGroup;
