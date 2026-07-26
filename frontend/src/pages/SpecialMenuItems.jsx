import Loader from "../components/Loader"; // 👈 Intha line ah check panni top imports kooda add panniku
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { 
  ArrowLeft, Search, Coffee, Utensils, Moon, Leaf, Flame, 
  Save, Edit2, Trash2, X, Loader2, PlusCircle, Eye, Upload, Package, Layers
} from "lucide-react";

// Sourced master data configuration structures dynamic fallback sync hook
import specialMenus from "../data/SpecialMenus"; 

const categoryIcons = {
  Breakfast: <Coffee size={18} />,
  Lunch: <Utensils size={18} />,
  Dinner: <Moon size={18} />,
  VegPackages: <Leaf size={18} />,
  NonVegPackages: <Flame size={18} />,
};

// Configured SweetAlert2 Custom Toast Instance (gtoast)
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

const SpecialMenuItems = () => {
  const navigate = useNavigate();
  
  /* ==========================================================================
      STATES & CORE MODES
     ========================================================================== */
  const [viewMode, setViewMode] = useState("view"); // Modes: "view" | "edit" | "add"
  const [activeTab, setActiveTab] = useState("Breakfast");
  const [searchQuery, setSearchQuery] = useState("");

  const [flatMenuData, setFlatMenuData] = useState(() => {
    const saved = localStorage.getItem("lc_flat_special_inventory");
    if (saved) return JSON.parse(saved);

    const processedList = [];
    Object.keys(specialMenus).forEach((categoryKey) => {
      specialMenus[categoryKey].forEach((section, sectionIdx) => {
        const isPkg = categoryKey.toLowerCase().includes("packages");

        if (isPkg) {
          processedList.push({
            id: `pkg-${categoryKey.slice(0, 3)}-${sectionIdx}`,
            category: categoryKey,
            groupTitleEn: section.title.en,
            groupTitleTa: section.title.ta,
            dishNameEn: section.title.en,
            dishNameTa: section.title.ta,
            price: section.price || 0,
            isPackage: true,
            type: categoryKey.startsWith("Veg") ? "veg" : "non-veg",
            componentsList: section.items?.map(i => i.en || i).join(", ") || "",
            image: ""
          });
        } else {
          section.items?.forEach((item, itemIdx) => {
            processedList.push({
              id: `item-${categoryKey.slice(0, 3)}-${sectionIdx}-${itemIdx}`,
              category: categoryKey,
              groupTitleEn: section.title.en,
              groupTitleTa: section.title.ta,
              dishNameEn: item.en,
              dishNameTa: item.ta || "",
              price: item.price || 0,
              isPackage: false,
              type: item.type || "veg",
              componentsList: "",
              image: ""
            });
          });
        }
      });
    });
    return processedList;
  });

  /* ==========================================================================
      ADD FORM DATA STATES
     ========================================================================== */
  const [formType, setFormType] = useState("item"); // "item" | "package"
  const [groupSelectionType, setGroupSelectionType] = useState("select"); // "select" | "new"
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const [newItemState, setNewItemState] = useState({
    category: "Breakfast",
    groupTitleEn: "",
    groupTitleTa: "",
    dishNameEn: "",
    dishNameTa: "",
    type: "veg",
    price: "",
    componentsList: "",
    image: ""
  });

  // Extract unique group categories dynamically for item dropdown select operations
  const existingGroups = Array.from(
    new Set(flatMenuData.map(i => JSON.stringify({ en: i.groupTitleEn, ta: i.groupTitleTa })))
  ).map(str => JSON.parse(str));

  /* ==========================================================================
      ROW-LEVEL INTERACTION & LOADING STATES (EDIT/DELETE)
     ========================================================================== */
  const [editingRowId, setEditingRowId] = useState(null); 
  const [rowBufferState, setRowBufferState] = useState({}); 
  const [loadingRowId, setLoadingRowId] = useState(null); 

  useEffect(() => {
    localStorage.setItem("lc_flat_special_inventory", JSON.stringify(flatMenuData));
  }, [flatMenuData]);

  /* ==========================================================================
      ADD FORM SUBMIT & UTILS
     ========================================================================== */
  const handleFormInputChange = (key, val) => {
    setNewItemState(prev => ({ ...prev, [key]: val }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleFormInputChange("image", reader.result); // Base64 encoding for temporary representation
      };
      reader.readAsDataURL(file);
    }
  };

  const submitNewInventoryItem = async (e) => {
    e.preventDefault();

    // Field Destructuring Validation
    const { category, groupTitleEn, dishNameEn, price, type } = newItemState;
    
    if (formType === "item" && groupSelectionType === "new" && !groupTitleEn) {
      Toast.fire({ icon: "error", title: "Group Classification is required!" });
      return;
    }
    if (!dishNameEn || price === "" || Number(price) < 0) {
      Toast.fire({ icon: "error", title: "Fill required parameters accurately!" });
      return;
    }

    setIsSubmitLoading(true);

    setTimeout(async () => {
      const generatedId = `${formType}-${Date.now()}`;
      
      const configuredPayload = {
        id: generatedId,
        category: formType === "package" ? (type === "veg" ? "VegPackages" : "NonVegPackages") : category,
        groupTitleEn: formType === "package" ? newItemState.groupTitleEn : (groupSelectionType === "select" ? newItemState.groupTitleEn.split(" | ")[0] : newItemState.groupTitleEn),
        groupTitleTa: formType === "package" ? newItemState.groupTitleTa : (groupSelectionType === "select" ? newItemState.groupTitleEn.split(" | ")[1] || "" : newItemState.groupTitleTa),
        dishNameEn: newItemState.dishNameEn,
        dishNameTa: newItemState.dishNameTa,
        type: newItemState.type,
        price: Number(newItemState.price),
        isPackage: formType === "package",
        componentsList: formType === "package" ? newItemState.componentsList : "",
        image: newItemState.image
      };

      const finalUpdatedList = [configuredPayload, ...flatMenuData];
      setFlatMenuData(finalUpdatedList);

      // REST Engine DB Pipeline Hook integration routing
      try {
        await axios.post(`http://localhost:5000/api/booking1/menu-bulk-sync`, {
          updatedInventory: finalUpdatedList
        });
      } catch (err) {
        console.log("Local cluster network synchronization error: ", err.message);
      }

      setIsSubmitLoading(false);
      Toast.fire({ icon: "success", title: `${formType === "package" ? "Package" : "Item"} created and saved to DB!` });

      // Reset Form State Elements
      setNewItemState({
        category: "Breakfast",
        groupTitleEn: "",
        groupTitleTa: "",
        dishNameEn: "",
        dishNameTa: "",
        type: "veg",
        price: "",
        componentsList: "",
        image: ""
      });
      setViewMode("view");
    }, 900);
  };

  /* ==========================================================================
      ROW ACTIONS (EDIT, SAVE, CANCEL, DELETE)
     ========================================================================== */
  const startEditingRow = (rowItem) => {
    setEditingRowId(rowItem.id);
    setRowBufferState({ ...rowItem }); 
  };

  const cancelRowEdit = () => {
    setEditingRowId(null);
    setRowBufferState({});
  };

  const handleRowInputChange = (fieldKey, targetValue) => {
    setRowBufferState(prev => ({ ...prev, [fieldKey]: targetValue }));
  };

  const saveRowChanges = async (id) => {
    if (!rowBufferState.groupTitleEn || !rowBufferState.dishNameEn || rowBufferState.price === "" || Number(rowBufferState.price) < 0) {
      Toast.fire({ icon: "error", title: "Fill required fields correctly!" });
      return;
    }

    setLoadingRowId(id);

    setTimeout(async () => {
      const synchronizedList = flatMenuData.map(item => {
        if (item.id === id) {
          return {
            ...item,
            groupTitleEn: rowBufferState.groupTitleEn,
            groupTitleTa: rowBufferState.groupTitleTa,
            dishNameEn: rowBufferState.dishNameEn,
            dishNameTa: rowBufferState.dishNameTa,
            type: rowBufferState.type,
            price: Number(rowBufferState.price)
          };
        }
        return item;
      });

      setFlatMenuData(synchronizedList);

      try {
        await axios.post(`http://localhost:5000/api/booking1/menu-bulk-sync`, {
          updatedInventory: synchronizedList
        });
      } catch (err) {
        console.log("Local cluster terminal routing offline: ", err.message);
      }

      setEditingRowId(null);
      setRowBufferState({});
      setLoadingRowId(null);

      Toast.fire({ icon: "success", title: "Item updated successfully!" });
    }, 800);
  };

  const deleteRowItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this menu item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#962a27",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoadingRowId(id);

        setTimeout(async () => {
          const synchronizedList = flatMenuData.filter(item => item.id !== id);
          setFlatMenuData(synchronizedList);

          try {
            await axios.post(`http://localhost:5000/api/booking1/menu-bulk-sync`, {
              updatedInventory: synchronizedList
            });
          } catch (err) {
            console.log("Local cluster terminal routing offline: ", err.message);
          }

          setLoadingRowId(null);
          Toast.fire({ icon: "success", title: "Item deleted successfully!" });
        }, 700);
      }
    });
  };

  /* ==========================================================================
      FILTER SEGMENT DATA LOGIC
     ========================================================================== */
  const tabFilteredItems = flatMenuData.filter(item => item.category === activeTab);
  
  const finalFilteredItems = tabFilteredItems.filter(item => 
    item.dishNameEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.dishNameTa.includes(searchQuery) ||
    item.groupTitleEn.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-4 md:p-10">
      
      {/* HEADER MASTER BLOCK WITH CONTROLS */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-[#962a27] text-sm font-semibold mb-2 transition-all">
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <h1 className="text-3xl md:text-5xl font-bold text-[#962a27]">Catering Menu Inventory</h1>
          <p className="text-gray-500 mt-1 text-xs md:text-sm">Choose a mode below to manage details, text streams, and system metrics safely.</p>
        </div>

        {/* TOP THREE SEGMENT CONTROL MODE BUTTONS */}
        <div className="flex bg-gray-200/80 p-1 rounded-xl self-start md:self-center">
          <button 
            onClick={() => { setViewMode("view"); cancelRowEdit(); }}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs md:text-sm font-bold rounded-lg transition-all ${viewMode === "view" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
          >
            <Eye size={16} /> View Mode
          </button>
          <button 
            onClick={() => setViewMode("edit")}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs md:text-sm font-bold rounded-lg transition-all ${viewMode === "edit" ? "bg-[#962a27] text-white shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
          >
            <Edit2 size={16} /> Edit Mode
          </button>
          <button 
            onClick={() => { setViewMode("add"); cancelRowEdit(); }}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs md:text-sm font-bold rounded-lg transition-all ${viewMode === "add" ? "bg-green-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
          >
            <PlusCircle size={16} /> Add Mode
          </button>
        </div>
      </div>

      {/* RENDER DYNAMIC SYSTEM INTERFACES BASED ON ACTIVE MODE */}
      {viewMode === "add" ? (
        /* Dynamic Add Mode Implementation Block Form Layout */
        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm animate-fadeIn">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center"><PlusCircle size={22} /></div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Add New Inventory Entry</h3>
              <p className="text-xs text-gray-400 mt-0.5">Append item records directly to your global production schema instance.</p>
            </div>
          </div>

          {/* SECTION 1: SELECTION SPECIFICATION TYPE */}
          <div className="mb-6">
            <label className="text-xs font-bold text-gray-400 block uppercase mb-2">Select Structure Configuration</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormType("item")}
                className={`p-4 rounded-xl border-2 font-bold text-sm flex flex-col items-center gap-2 transition-all ${formType === "item" ? "border-[#962a27] bg-red-50/20 text-[#962a27]" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}
              >
                <Layers size={20} /> Single Dish Item
              </button>
              <button
                type="button"
                onClick={() => setFormType("package")}
                className={`p-4 rounded-xl border-2 font-bold text-sm flex flex-col items-center gap-2 transition-all ${formType === "package" ? "border-[#962a27] bg-red-50/20 text-[#962a27]" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}
              >
                <Package size={20} /> Combo Packages
              </button>
            </div>
          </div>

          <form onSubmit={submitNewInventoryItem} className="space-y-5 text-sm">
            
            {/* ITEM TYPE CONDITIONAL RENDERING */}
            {formType === "item" ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-1.5">Target Timeframe Category</label>
                    <select 
                      value={newItemState.category}
                      onChange={(e) => handleFormInputChange("category", e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded-xl bg-white focus:border-[#962a27] outline-none"
                    >
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Dinner">Dinner</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-1.5">Group Classification Logic</label>
                    <div className="flex bg-gray-100 p-1 rounded-xl gap-1 mb-1.5">
                      <button type="button" onClick={() => { setGroupSelectionType("select"); handleFormInputChange("groupTitleEn", ""); }} className={`flex-1 text-center text-xs py-1.5 font-bold rounded-lg ${groupSelectionType === "select" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500"}`}>Select Existing</button>
                      <button type="button" onClick={() => { setGroupSelectionType("new"); handleFormInputChange("groupTitleEn", ""); }} className={`flex-1 text-center text-xs py-1.5 font-bold rounded-lg ${groupSelectionType === "new" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500"}`}>Add New</button>
                    </div>
                  </div>
                </div>

                {groupSelectionType === "select" ? (
                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-1.5">Choose Group Classification</label>
                    <select
                      onChange={(e) => handleFormInputChange("groupTitleEn", e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded-xl bg-white focus:border-[#962a27] outline-none"
                      required
                    >
                      <option value="">-- Select Group --</option>
                      {existingGroups.map((g, idx) => (
                        <option key={idx} value={`${g.en} | ${g.ta}`}>{g.en} / {g.ta}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                    <div>
                      <label className="text-xs font-bold text-gray-500 block mb-1.5">Group Classification (English)</label>
                      <input type="text" placeholder="e.g. Idly Varieties" value={newItemState.groupTitleEn} onChange={(e) => handleFormInputChange("groupTitleEn", e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-xl focus:border-[#962a27] outline-none" required />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 block mb-1.5">Group Classification (Tamil)</label>
                      <input type="text" placeholder="e.g. இட்லி வகைகள்" value={newItemState.groupTitleTa} onChange={(e) => handleFormInputChange("groupTitleTa", e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-xl focus:border-[#962a27] outline-none" />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-1.5">Dish Item Name (English)</label>
                    <input type="text" placeholder="e.g. Podi Idly (2 Pcs)" value={newItemState.dishNameEn} onChange={(e) => handleFormInputChange("dishNameEn", e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-xl focus:border-[#962a27] outline-none" required />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-1.5">Dish Item Name (Tamil)</label>
                    <input type="text" placeholder="e.g. பொடி இட்லி" value={newItemState.dishNameTa} onChange={(e) => handleFormInputChange("dishNameTa", e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-xl focus:border-[#962a27] outline-none" />
                  </div>
                </div>
              </>
            ) : (
              /* PACKAGE LAYOUT RENDERING FORM SPECIFICATION SETS */
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-1.5">Group Classification / Title (English)</label>
                    <input type="text" placeholder="e.g. Traditional Wedding Lunch Pack" value={newItemState.groupTitleEn} onChange={(e) => handleFormInputChange("groupTitleEn", e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-xl focus:border-[#962a27] outline-none" required />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-1.5">Group Classification / Title (Tamil)</label>
                    <input type="text" placeholder="e.g. பாரம்பரிய திருமண மதிய உணவு" value={newItemState.groupTitleTa} onChange={(e) => handleFormInputChange("groupTitleTa", e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-xl focus:border-[#962a27] outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-1.5">Package Identity Name (English)</label>
                    <input type="text" placeholder="e.g. Premium Veg Box" value={newItemState.dishNameEn} onChange={(e) => handleFormInputChange("dishNameEn", e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-xl focus:border-[#962a27] outline-none" required />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-1.5">Package Identity Name (Tamil)</label>
                    <input type="text" placeholder="e.g. பிரீமியம் சைவ பேக்" value={newItemState.dishNameTa} onChange={(e) => handleFormInputChange("dishNameTa", e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-xl focus:border-[#962a27] outline-none" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1.5">Included Items Configuration List (Comma Separated)</label>
                  <textarea rows="2" placeholder="e.g. Rice, Sambar, Rasam, Appalam, Payasam" value={newItemState.componentsList} onChange={(e) => handleFormInputChange("componentsList", e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-xl focus:border-[#962a27] outline-none resize-none" />
                </div>
              </>
            )}

            {/* SHARED SUITE CONTROLS (DIET PREFERENCE & VALUATION PRICING LEVELS) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1.5">Dietary Classification Preference</label>
                <select 
                  value={newItemState.type}
                  onChange={(e) => handleFormInputChange("type", e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl bg-white focus:border-[#962a27] outline-none"
                >
                  <option value="veg">Veg (சைவம்)</option>
                  <option value="non-veg">Non-Veg (அசைவம்)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1.5">Base Baseline Valuation Cost (₹)</label>
                <input type="number" placeholder="e.g. 180" value={newItemState.price} onChange={(e) => handleFormInputChange("price", e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-xl font-semibold focus:border-[#962a27] outline-none" required />
              </div>
            </div>

            {/* OPTIONAL PROFILE MEDIA IMAGE SCHEMA CONTROLS */}
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1.5">Display Representative Asset Media (Optional Image)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center hover:border-[#962a27] transition-colors relative bg-gray-50">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                {newItemState.image ? (
                  <div className="flex items-center justify-center gap-3">
                    <img src={newItemState.image} alt="Preview" className="w-12 h-12 object-cover rounded-lg border shadow-xs" />
                    <span className="text-xs font-medium text-green-600">Media Loaded Successfully! Click to replace.</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-1.5 text-gray-400">
                    <Upload size={20} />
                    <span className="text-xs font-medium">Click or Drag & Drop asset media files here</span>
                  </div>
                )}
              </div>
            </div>

            {/* FORM FOOTER TRIGGER ACTIONS */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setViewMode("view")}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold transition-all text-xs"
              >
                Cancel Workspace
              </button>
              <button
                type="submit"
                disabled={isSubmitLoading}
                className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold flex items-center gap-2 shadow transition-all text-xs"
              >
                {isSubmitLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save Records to DB
              </button>
            </div>

          </form>
        </div>
      ) : (
        <>
          {/* TABS CONTROLLERS BAR */}
          <div className="max-w-7xl mx-auto mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {["Breakfast", "Lunch", "Dinner", "VegPackages", "NonVegPackages"].map((tabKey) => (
              <button
                key={tabKey}
                disabled={editingRowId !== null} 
                onClick={() => { setActiveTab(tabKey); setSearchQuery(""); }}
                className={`px-5 py-3 rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 whitespace-nowrap transition-all disabled:opacity-40 ${
                  activeTab === tabKey ? "bg-[#962a27] text-white shadow-md scale-105" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {categoryIcons[tabKey]}
                {tabKey === "VegPackages" ? "Veg Packages" : tabKey === "NonVegPackages" ? "Non-Veg Packages" : tabKey}
              </button>
            ))}
          </div>

          {/* FILTER CONTROLLER INPUT */}
          <div className="max-w-7xl mx-auto mb-6 relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              disabled={editingRowId !== null}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={editingRowId ? "Complete your active row modification to search..." : "Search data listings..."}
              className="w-full bg-white border border-gray-300 rounded-xl pl-12 pr-4 py-3 shadow-sm focus:outline-none focus:border-[#962a27] text-sm disabled:bg-gray-100 disabled:text-gray-400"
            />
          </div>

          {/* TABLE MASTER INVENTORY STRUCTURE */}
          <div className="max-w-7xl mx-auto">
            {finalFilteredItems.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-200 py-16 flex flex-col items-center justify-center text-center px-4">
                <div className="w-16 h-16 rounded-full bg-[#fff7f7] flex items-center justify-center text-3xl">🍲</div>
                <h2 className="mt-4 text-xl font-bold text-[#962a27]">No Matching Sourced Items Logs</h2>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                
                {/* 1. DESKTOP VIEW */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm text-gray-700 min-w-[1000px]">
                    <thead className="bg-[#962a27] text-white font-bold uppercase text-xs">
                      <tr>
                        <th className="p-4 w-[23%]">Group Classification (En / Ta)</th>
                        <th className="p-4 w-[22%]">Dish Item Name (English)</th>
                        <th className="p-4 w-[22%]">Dish Item Name (Tamil)</th>
                        <th className="p-4 w-[10%]">Type</th>
                        <th className="p-4 w-[13%]">Base Cost (₹)</th>
                        {viewMode === "edit" && <th className="p-4 w-[10%] text-center">Action</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {finalFilteredItems.map((rowItem) => {
                        const isCurrentEditing = editingRowId === rowItem.id;
                        const isCurrentLoading = loadingRowId === rowItem.id;

                        return (
                          <tr key={rowItem.id} className={`hover:bg-gray-50 transition-colors ${isCurrentEditing ? "bg-amber-50/40 hover:bg-amber-50/50" : ""}`}>
                            
                            {/* VARIETY GROUP */}
                            <td className="p-4">
                              {isCurrentEditing ? (
                                <div className="flex flex-col gap-1.5 animate-fadeIn">
                                  <input 
                                    type="text" 
                                    value={rowBufferState.groupTitleEn} 
                                    onChange={(e) => handleRowInputChange("groupTitleEn", e.target.value)}
                                    className="w-full p-1.5 border border-gray-300 rounded-lg text-xs font-semibold focus:border-[#962a27] outline-none bg-white"
                                  />
                                  <input 
                                    type="text" 
                                    value={rowBufferState.groupTitleTa} 
                                    onChange={(e) => handleRowInputChange("groupTitleTa", e.target.value)}
                                    className="w-full p-1.5 border border-gray-300 rounded-lg text-xs text-gray-600 focus:border-[#962a27] outline-none bg-white"
                                  />
                                </div>
                              ) : (
                                <>
                                  <span className="font-semibold text-gray-800 block">{rowItem.groupTitleEn}</span>
                                  <span className="text-[11px] text-gray-400 block font-medium">{rowItem.groupTitleTa}</span>
                                </>
                              )}
                            </td>

                            {/* DISH ENGLISH */}
                            <td className="p-4">
                              {isCurrentEditing ? (
                                <input 
                                  type="text" 
                                  value={rowBufferState.dishNameEn} 
                                  onChange={(e) => handleRowInputChange("dishNameEn", e.target.value)}
                                  className="w-full p-1.5 border border-gray-300 rounded-lg text-sm font-medium focus:border-[#962a27] outline-none bg-white"
                                />
                              ) : (
                                <div className="font-medium text-gray-900">
                                  {rowItem.dishNameEn}
                                  {rowItem.isPackage && <span className="ml-2 bg-amber-50 text-amber-700 font-bold text-[10px] px-2 py-0.5 rounded-md border border-amber-200">PACKAGE</span>}
                                </div>
                              )}
                            </td>

                            {/* DISH TAMIL */}
                            <td className="p-4">
                              {isCurrentEditing ? (
                                <input 
                                  type="text" 
                                  value={rowBufferState.dishNameTa} 
                                  onChange={(e) => handleRowInputChange("dishNameTa", e.target.value)}
                                  className="w-full p-1.5 border border-gray-300 rounded-lg text-sm focus:border-[#962a27] outline-none bg-white"
                                />
                              ) : (
                                <span className="text-gray-600 text-xs font-medium">{rowItem.dishNameTa || <span className="text-gray-300 italic">None</span>}</span>
                              )}
                            </td>

                            {/* DIET TYPE */}
                            <td className="p-4">
                              {isCurrentEditing ? (
                                <select
                                  value={rowBufferState.type}
                                  onChange={(e) => handleRowInputChange("type", e.target.value)}
                                  className="w-full p-1.5 border border-gray-300 rounded-lg text-xs bg-white focus:border-[#962a27] outline-none"
                                >
                                  <option value="veg">Veg</option>
                                  <option value="non-veg">Non-Veg</option>
                                </select>
                              ) : (
                                <span className={`inline-block w-2.5 h-2.5 rounded-full ${rowItem.type === "non-veg" ? "bg-red-600" : "bg-green-600"}`} title={rowItem.type}></span>
                              )}
                            </td>

                            {/* COST */}
                            <td className="p-4">
                              {isCurrentEditing ? (
                                <div className="flex items-center gap-1">
                                  <span className="font-bold text-[#962a27] text-xs">₹</span>
                                  <input 
                                    type="number" 
                                    value={rowBufferState.price} 
                                    onChange={(e) => handleRowInputChange("price", e.target.value)}
                                    className="w-full p-1.5 border border-gray-300 rounded-lg font-bold text-[#962a27] focus:border-[#962a27] outline-none text-sm bg-white"
                                  />
                                </div>
                              ) : (
                                <span className="font-bold text-[#962a27] text-base">₹ {rowItem.price}</span>
                              )}
                            </td>

                            {/* ROW ACTIONS IF IN EDIT MODE */}
                            {viewMode === "edit" && (
                              <td className="p-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  {isCurrentEditing ? (
                                    <>
                                      <button
                                        disabled={isCurrentLoading}
                                        onClick={() => saveRowChanges(rowItem.id)}
                                        className="text-green-600 hover:text-green-800 p-1.5 rounded-lg hover:bg-green-50 transition-all"
                                      >
                                        {isCurrentLoading ? <Loader2 size={18} className="animate-spin text-green-600" /> : <Save size={18} />}
                                      </button>
                                      <button
                                        disabled={isCurrentLoading}
                                        onClick={cancelRowEdit}
                                        className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-all"
                                      >
                                        <X size={18} />
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        disabled={isCurrentLoading}
                                        onClick={() => startEditingRow(rowItem)}
                                        className="text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50 transition-all"
                                      >
                                        <Edit2 size={18} />
                                      </button>
                                      <button
                                        disabled={isCurrentLoading}
                                        onClick={() => deleteRowItem(rowItem.id)}
                                        className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-all"
                                      >
                                        {isCurrentLoading ? <Loader2 size={18} className="animate-spin text-red-500" /> : <Trash2 size={18} />}
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            )}

                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* 2. MOBILE RESPONSIVE LAYOUT */}
                <div className="block lg:hidden divide-y divide-gray-100">
                  {finalFilteredItems.map((rowItem) => {
                    const isCurrentEditing = editingRowId === rowItem.id;
                    const isCurrentLoading = loadingRowId === rowItem.id;

                    return (
                      <div key={rowItem.id} className={`p-4 bg-white space-y-3 flex flex-col transition-all ${isCurrentEditing ? "bg-amber-50/30" : ""}`}>
                        
                        {isCurrentEditing ? (
                          <div className="space-y-3 animate-fadeIn text-xs">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-[10px] font-bold text-gray-400 block mb-0.5">CLASSIFICATION (EN)</label>
                                <input type="text" value={rowBufferState.groupTitleEn} onChange={(e) => handleRowInputChange("groupTitleEn", e.target.value)} className="w-full p-2 border rounded-lg bg-white" />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold text-gray-400 block mb-0.5">CLASSIFICATION (TA)</label>
                                <input type="text" value={rowBufferState.groupTitleTa} onChange={(e) => handleRowInputChange("groupTitleTa", e.target.value)} className="w-full p-2 border rounded-lg text-gray-600 bg-white" />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-[10px] font-bold text-gray-400 block mb-0.5">DISH NAME (EN)</label>
                                <input type="text" value={rowBufferState.dishNameEn} onChange={(e) => handleRowInputChange("dishNameEn", e.target.value)} className="w-full p-2 border rounded-lg font-medium bg-white" />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold text-gray-400 block mb-0.5">DISH NAME (TA)</label>
                                <input type="text" value={rowBufferState.dishNameTa} onChange={(e) => handleRowInputChange("dishNameTa", e.target.value)} className="w-full p-2 border rounded-lg bg-white" />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-[10px] font-bold text-gray-400 block mb-0.5">DIET TYPE</label>
                                <select value={rowBufferState.type} onChange={(e) => handleRowInputChange("type", e.target.value)} className="w-full p-2 border rounded-lg bg-white">
                                  <option value="veg">Veg</option>
                                  <option value="non-veg">Non-Veg</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-[10px] font-bold text-gray-400 block mb-0.5">PRICE (₹)</label>
                                <input type="number" value={rowBufferState.price} onChange={(e) => handleRowInputChange("price", e.target.value)} className="w-full p-2 border border-gray-300 font-bold rounded-lg text-[#962a27] bg-white" />
                              </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-dashed">
                              <button
                                disabled={isCurrentLoading}
                                onClick={() => saveRowChanges(rowItem.id)}
                                className="bg-green-600 text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow"
                              >
                                {isCurrentLoading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save
                              </button>
                              <button
                                disabled={isCurrentLoading}
                                onClick={cancelRowEdit}
                                className="bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
                              >
                                <X size={14} /> Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1">
                              <span className="text-[10px] text-gray-400 font-bold block uppercase">{rowItem.groupTitleEn} / {rowItem.groupTitleTa}</span>
                              <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${rowItem.type === "non-veg" ? "bg-red-600" : "bg-green-600"}`}></span>
                                {rowItem.dishNameEn}
                              </h4>
                              <span className="text-xs text-gray-500 font-medium block">{rowItem.dishNameTa || "இல்லை"}</span>
                            </div>

                            <div className="text-right shrink-0 flex flex-col items-end gap-3">
                              <div>
                                <span className="font-bold text-[#962a27] text-sm">₹ {rowItem.price}</span>
                              </div>
                              
                              {/* ACTIONS PANEL ON MOBILE IF IN EDIT MODE */}
                              {viewMode === "edit" && (
                                <div className="flex items-center gap-1">
                                  <button
                                    disabled={isCurrentLoading}
                                    onClick={() => startEditingRow(rowItem)}
                                    className="text-blue-600 p-2 rounded-lg bg-blue-50"
                                  >
                                    <Edit2 size={14} />
                                  </button>
                                  <button
                                    disabled={isCurrentLoading}
                                    onClick={() => deleteRowItem(rowItem.id)}
                                    className="text-red-500 p-2 rounded-lg bg-red-50"
                                  >
                                    {isCurrentLoading ? <Loader2 size={14} className="animate-spin text-red-500" /> : <Trash2 size={14} />}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>

              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
};

export default SpecialMenuItems;