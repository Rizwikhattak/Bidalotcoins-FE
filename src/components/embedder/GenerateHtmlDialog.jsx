import React, { useState, useEffect } from "react";
import DialogCommon from "../common/DialogCommon";
import { Button } from "../ui/button";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

const GenerateHtmlDialog = ({ open, onOpenChange, selectedRows }) => {
  const [htmlCode, setHtmlCode] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedCode, setEditedCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedRows && selectedRows.length > 0) {
      const generatedHtml = generateHtmlCode(selectedRows);
      setHtmlCode(generatedHtml);
      setEditedCode(generatedHtml);
    }
  }, [selectedRows]);

  const generateHtmlCode = (rows) => {
    const itemsHtml = rows
      .map(
        (row) => `
    <div class="product-card">
      <div class="product-image-container">
        <img src="${row.image || ""}" alt="${
          row.name || "Product"
        }" class="product-image">
        ${row.tag ? `<span class="product-tag">${row.tag}</span>` : ""}
      </div>
      <div class="product-details">
        <h3 class="product-name">${row.name || "Unnamed Product"}</h3>
        <p class="product-description">${row.description || ""}</p>
        <div class="product-footer">
          <span class="product-price">$${row.price || "0.00"}</span>
        </div>
      </div>
    </div>`
      )
      .join("");

    return `<div class="products-container">
  <style>
    .products-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }

    .product-card {
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .product-image-container {
      position: relative;
      width: 100%;
      height: 180px;
      background: #f8f9fa;
      overflow: hidden;
    }

    .product-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      object-fit: contain;
      transition: transform 0.3s ease;
    }

    .product-card:hover .product-image {
      transform: scale(1.02);
    }

    .product-tag {
      position: absolute;
      top: 12px;
      right: 12px;
      background: #ff6b6b;
      color: #ffffff;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .product-details {
      padding: 16px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .product-name {
      font-size: 18px;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 8px 0;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-description {
      font-size: 14px;
      color: #718096;
      margin: 0 0 16px 0;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      flex-grow: 1;
    }

    .product-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-top: auto;
    }

    .product-price {
      font-size: 24px;
      font-weight: 700;
      color: #2d3748;
    }

    .product-button {
      background: #4299e1;
      color: #ffffff;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s ease;
      white-space: nowrap;
    }

    .product-button:hover {
      background: #3182ce;
    }

    .product-button:active {
      transform: scale(0.98);
    }

    @media (max-width: 768px) {
      .products-container {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
        padding: 16px;
      }

      .product-name {
        font-size: 16px;
      }

      .product-price {
        font-size: 20px;
      }

      .product-button {
        padding: 8px 16px;
        font-size: 13px;
      }
    }

    @media (max-width: 480px) {
      .products-container {
        grid-template-columns: 1fr;
        gap: 12px;
        padding: 12px;
      }
    }
  </style>
${itemsHtml}
</div>`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(isEditing ? editedCode : htmlCode);
      setCopied(true);
      toast.success("HTML code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy code");
    }
  };

  const handleSave = () => {
    setHtmlCode(editedCode);
    setIsEditing(false);
    toast.success("Changes saved!");
  };

  const handleCancel = () => {
    setEditedCode(htmlCode);
    setIsEditing(false);
  };

  return (
    <DialogCommon
      open={open}
      onOpenChange={onOpenChange}
      headerTitle="Generate HTML Code"
      className="sm:max-w-6xl"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {selectedRows?.length || 0} product
            {selectedRows?.length !== 1 ? "s" : ""} selected
          </p>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit Code
                </Button>
                <Button onClick={handleCopy}>
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Code
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </>
            )}
          </div>
        </div>

        {!isEditing ? (
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto max-h-[60vh] text-sm">
              <code>{htmlCode}</code>
            </pre>
          </div>
        ) : (
          <div className="relative">
            <textarea
              value={editedCode}
              onChange={(e) => setEditedCode(e.target.value)}
              className="w-full h-[60vh] p-4 bg-gray-900 text-gray-100 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              spellCheck="false"
            />
          </div>
        )}

        <div className="border-t pt-4">
          <p className="text-sm font-semibold mb-2">Preview:</p>
          <div className="border rounded-lg p-4 bg-gray-50 max-h-[40vh] overflow-auto">
            <div
              dangerouslySetInnerHTML={{
                __html: isEditing ? editedCode : htmlCode,
              }}
            />
          </div>
        </div>
      </div>
    </DialogCommon>
  );
};

export default GenerateHtmlDialog;
