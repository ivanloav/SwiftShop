import { useState } from "react";

export const useShowForm = () => {
    const [showForm, setShowForm] = useState(false);

    const show = () => setShowForm(true);
    const hide = () => setShowForm(false);

    return {
        showForm,
        show,
        hide,
    };
};